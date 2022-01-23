from flask import current_app as app
from flask import request

from api.psql import db
from api.psql.utils import (
    insert_answer,
    insert_blank_data,
    insert_blank_registration_data,
    insert_patient,
)


@app.route("/submit_registration", methods=["POST"])
def submit_registration():
    with db.getconn() as connection:
        cursor = connection.cursor()
        cursor2 = connection.cursor()

        station_count_query = """ SELECT COUNT(*) from station """
        cursor.execute(station_count_query)
        connection.commit()
        num_of_stations = cursor.fetchall()[0][0]
        print(num_of_stations)

        # initialise array with 0s of size = num_of_stations
        completed_stations = [0] * num_of_stations

        # Registration station is completed
        completed_stations[0] = 2
        insert_patient("true", completed_stations, connection)

        patient_id_query = (
            """ SELECT patient_id from patient ORDER BY patient_id DESC LIMIT 1 """
        )
        cursor.execute(patient_id_query)
        connection.commit()
        patient_id = cursor.fetchall()[0][0]
        print(patient_id)

        data = request.get_json()
        print(data)
        registration_questions = data["Registration"]

        for json_question in registration_questions:
            question = json_question["question"]
            answer = json_question["answers"]

            question_id_query = (
                """SELECT question_id FROM question WHERE question = '{0}'""".format(
                    question
                )
            )

            cursor2.execute(question_id_query)
            question_id = cursor2.fetchall()[0][0]
            print(question_id)

            connection.commit()

            insert_answer(patient_id, answer, question_id, 1)

        insert_blank_data(patient_id)
        insert_blank_registration_data(patient_id)

        print("Successful submission of registration.")
        return str(patient_id)
