import json

import psycopg2
from api.psql import db
from flask import current_app as app
from flask import request


@app.route("/get_all_patients", methods=["GET"])
def get_all_patients():
    with db.getconn() as connection:
        cursor = connection.cursor()
        # Get all existing patient IDs in DB.
        patient_select_query = (
            """ SELECT patient_id FROM patient ORDER BY patient_id ASC"""
        )
        cursor.execute(patient_select_query)
        connection.commit()
        patient_ID_list = cursor.fetchall()
        # print(patient_ID_list)

        # List containing all patient info to return at the end.
        results = []

        # For each patient we need to query the Q&A from registration,
        # and also process their stored array to see which stations were completed.
        for patient_ID in patient_ID_list:
            id = patient_ID[0]
            this_patient_data = {"id": id}
            print(id)
            # Select out answers from this patient from the registration page.
            answer_select_query = """SELECT question_id, answers FROM answer WHERE patient_id = {0}""".format(
                id
            )
            cursor.execute(answer_select_query)
            connection.commit()
            answers_list = cursor.fetchall()
            print(answers_list)
            # For each answer in answers_list, find the matching question and append to the result.
            for answer in answers_list:
                matching_question_id = answer[0]
                answer_string = answer[1]
                print(answer_string)
                question_select_query = (
                    """ SELECT question FROM question WHERE question_id = {0}""".format(
                        matching_question_id
                    )
                )
                cursor.execute(question_select_query)
                connection.commit()
                # It's abit weird here as fetchall returns [('question',)].
                question_string = cursor.fetchall()[0][0]
                # print(question_string)
                # Append each question: answer pair to the list.
                this_patient_data.update({question_string: answer_string})

            # Now, need to process the patient's array containing completed_stations info.
            array_select_query = """SELECT completed_station FROM patient WHERE patient_id = {0}""".format(
                id
            )
            cursor.execute(array_select_query)
            connection.commit()
            # Same reason for [0][0] as above.
            completed_stations_array = cursor.fetchall()[0][0]
            # print(completed_stations_array)
            # Iterate array and match to the station_id (Assumming that this array indices correspond to the station_ids)
            for index in range(1, len(completed_stations_array) + 1):
                # IDs in db start from 1, while array indices start from 0.
                completion_info = completed_stations_array[index - 1]
                station_select_query = """SELECT station_name FROM station WHERE station_id = {0} """.format(
                    index
                )
                cursor.execute(station_select_query)
                connection.commit()
                station_name = cursor.fetchall()[0][0]
                # print(station_name)
                outcome = ""
                # Construct the status message depending on the value of i (the value stored at this position in the array).
                if completion_info == 0:
                    outcome = "Not Queued"
                elif completion_info == 1:
                    outcome = "In Queue"
                elif completion_info == 2:
                    outcome = "Completed"
                else:
                    outcome = "Unknown status"

                # Append each station and the status to the list.
                this_patient_data.update({station_name: outcome})

            availability_query = (
                """SELECT available from patient WHERE patient_id = {0}""".format(id)
            )
            cursor.execute(availability_query)
            connection.commit()
            availability = cursor.fetchall()[0][0]
            this_patient_data.update({"Is Available": availability})

            # Processing of this patient is done. Append to results.
            results.append(this_patient_data)
            # Iterate to next patient.

        return json.dumps(results)


@app.route("/get_data/<int:patient_id>", methods=["GET"])
def get_patient_data(patient_id):
    with db.getconn() as connection:
        cursor = connection.cursor()
        cursor2 = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor3 = connection.cursor()
        postgres_select_query = """ SELECT station_id FROM station"""
        cursor.execute(postgres_select_query)
        connection.commit()
        station_id_list = cursor.fetchall()
        # print(station_id_list)
        results = {}

        for i in station_id_list:

            (station_id,) = i
            postgres_select_query = """SELECT question, answers FROM question INNER JOIN answer ON question.question_id = answer.question_id WHERE question.station_id = {0} AND answer.patient_id = {1}""".format(
                station_id, patient_id
            )
            postgres_select_query2 = (
                """SELECT station_name FROM station WHERE station_id = {0}""".format(
                    station_id
                )
            )
            cursor3.execute(postgres_select_query2)
            (station_name,) = cursor3.fetchall()[0]
            cursor2.execute(postgres_select_query)
            connection.commit()

            data = cursor2.fetchall()
            data = [dict(row) for row in data]

            cursor4 = connection.cursor()

            for j in data:
                question_id_query = """SELECT question_id FROM question WHERE question LIKE '{0}'""".format(
                    j["question"].replace("'", "''")
                )
                cursor4.execute(question_id_query)
                num = cursor4.fetchall()[0]
                connection.commit()
                j["num"] = num

            results.update({station_name: data})

        print("Successful query of question table.")
        # print(results)

        # {'Registration': [
        #   {'question': 'Name', 'answers': 'ans', 'num': 1},
        #   {'question': 'Gender', 'answers': 'ans2', 'num': 2},
        #   {'question': 'Age', 'answers': 'ans3', 'num': 3},
        #   {'question': 'Birthday', 'answers': 'ans4', 'num': 4}
        #   ]
        # }

        return results


@app.route("/update_patient_data/<int:patient_id>", methods=["POST"])
def update_patient_data(patient_id):
    with db.getconn() as connection:
        cursor = connection.cursor()
        data = request.get_json()
        for station in data.keys():
            for json_question in data[station]:
                question = json_question["question"]

                answer = json_question["answers"]

                cursor2 = connection.cursor()
                station_id_query = (
                    """SELECT station_id FROM station WHERE station_name = %s"""
                )
                station_to_get = (station,)
                cursor2.execute(station_id_query, station_to_get)
                station_id = cursor2.fetchall()[0]

                question_id_query = """SELECT question_id FROM question WHERE question = %s AND station_id = %s"""
                question_to_get = (
                    question,
                    station_id,
                )
                cursor2.execute(question_id_query, question_to_get)
                question_id = cursor2.fetchall()

                question_id_query = """SELECT question_id FROM question WHERE question = %s AND station_id = %s"""
                question_to_get = (
                    question,
                    station_id,
                )
                cursor2.execute(question_id_query, question_to_get)
                question_id = cursor2.fetchall()[0]

                print(question_id)

                answer_update_query = """UPDATE answer SET answers = %s WHERE question_id = %s AND patient_id = %s"""
                answer_to_update = (answer, question_id, patient_id)
                cursor.execute(answer_update_query, answer_to_update)
                connection.commit()

        return "Data successfully updated"


@app.route("/delete_patient/<int:patient_id>", methods=["POST"])
def delete_patient(patient_id):
    with db.getconn() as connection:
        cursor = connection.cursor()

        # Delete patient
        postgres_delete_patient_query = (
            """DELETE FROM patient WHERE patient_id = {0}""".format(patient_id)
        )
        cursor.execute(postgres_delete_patient_query)
        connection.commit()
        print("patient deleted from patient table")

        # Delete answer
        postgres_delete_answer_query = (
            """DELETE FROM answer WHERE patient_id = {0}""".format(patient_id)
        )
        cursor.execute(postgres_delete_answer_query)
        connection.commit()
        print("patient answers deleted from answer table")
        return "patient successfully deleted"


@app.route("/set_patient_availability", methods=["POST"])
def set_patient_availability():
    with db.getconn() as connection:
        cursor = connection.cursor()

        data = request.get_json()
        print(data)

        for key, value in data.items():

            if key == "patient_id":
                patient_id = value

            if key == "boolean":
                available = value

            # print(key)
            # print(value)

        postgres_update_query = (
            """ UPDATE patient SET available = %s WHERE patient_id = %s"""
        )
        record_to_update = (
            available,
            patient_id,
        )
        cursor.execute(postgres_update_query, record_to_update)
        connection.commit()

        print("ok")

        return "Patient status updated"


@app.route("/update_completed_stations/<int:patient_id>", methods=["POST"])
def update_completed_stations(patient_id):
    with db.getconn() as connection:
        cursor = connection.cursor()
        cursor2 = connection.cursor()

        data = request.get_json()
        print(data)

        # initialise empty stations array
        station_count_query = """ SELECT COUNT(*) from station """
        cursor.execute(station_count_query)
        connection.commit()
        num_of_stations = cursor.fetchall()[0][0]
        print(num_of_stations)

        completed_stations = [0] * num_of_stations

        for station_name, completion_info in data.items():
            station_id_query = """SELECT station_id FROM station WHERE station_name LIKE '{0}' """.format(
                station_name.replace("'", "''")
            )
            cursor2.execute(station_id_query)
            connection.commit()
            station_id = cursor2.fetchall()[0][0] - 1
            print(station_id)

            if completion_info == "Not Queued":
                completed_stations[station_id] = 0
            elif completion_info == "In Queue":
                completed_stations[station_id] = 1
            elif completion_info == "Completed":
                completed_stations[station_id] = 2
            else:
                completed_stations[station_id] = -1

            # print(key)
            # print(value)

        postgres_update_query = (
            """ UPDATE patient SET completed_station = %s WHERE patient_id = %s"""
        )
        record_to_update = (
            completed_stations,
            patient_id,
        )
        cursor.execute(postgres_update_query, record_to_update)
        connection.commit()

        print("ok")

        return "Completed stations updated"
