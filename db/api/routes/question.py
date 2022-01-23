import json

import psycopg2.extras
from flask import current_app as app
from flask import request

from api.psql import db


@app.route("/", methods=["GET"])
def hello_world():
    return "Server running"

@app.route("/get_questions", methods=["GET"])
def get_all_questions():
    with db.getconn() as connection:
        cursor = connection.cursor()
        cursor2 = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor3 = connection.cursor()
        postgres_select_query = """ SELECT station_id FROM station"""
        cursor.execute(postgres_select_query)
        connection.commit()
        station_id_list = cursor.fetchall()
        print(station_id_list)
        results = {}
        for i in station_id_list:
            (station_id,) = i
            postgres_select_query = """SELECT question_num, question, type_info, required, options 
                FROM question INNER JOIN type ON question.type_id = type.type_id WHERE station_id = {0}""".format(
                station_id
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

            results.update({station_name: cursor2.fetchall()})
            # print(results)
            print("Successful query of question table.")
        return json.dumps(results)

    # returns: {"Registration": [
    #     {"question_num": 1, "question": "Name", "type": "text", "required": true, "options": []},
    #     {"question_num": 2, "question": "Gender", "type": "text", "required": true, "options": []},
    #     {"question_num": 3, "question": "Age", "type": "radio", "required": true, "options": []},
    #     {"question_num": 4, "question": "Birthday", "type": "checkbox", "required": true, "options": []}
    #     ]
    # }...

@app.route("/add_question", methods=["POST"])
def add_question():
    with db.getconn() as connection:
        cursor = connection.cursor()

        data = request.get_json()
        print(data)

        station_name = data["station_name"]
        question_num = data["question_number"]
        question = data["question"]
        type = data["type"]
        is_required = data["required"]
        options = data["options"]

        type_id_query = (
            """SELECT type_id FROM type WHERE type_info = '{0}'""".format(
                    type
                )
        )

        cursor.execute(type_id_query)
        type_id = cursor.fetchall()#[0][0]

        if not type_id:
            return "type doesn't exist"

        type_id = type_id[0][0]

        connection.commit()

        station_id_query = (
                """SELECT station_id FROM station WHERE station_name = '{0}'""".format(
                    station_name
                )
        )

        cursor.execute(station_id_query)
        station_id = cursor.fetchall()#[0][0]

        if not station_id:
            return "station doesn't exist"

        station_id = station_id[0][0]

        connection.commit()

        insert_question_query = (
            """INSERT INTO question (question_id, question_num, question, required, options, station_id, type_id) 
                VALUES (DEFAULT, %s, %s, %s, %s, %s, %s) RETURNING question_id"""
        )

        question_to_insert = (
            question_num,
            question,
            is_required,
            options,
            station_id,
            type_id
        )

        cursor.execute(insert_question_query, question_to_insert)
        connection.commit()

        question_id = cursor.fetchall()[0][0]

        print("Successful addition of question.")
        # "Question `{}` added to station {}".format(question, station_name)
        return json.dumps({"question_id": question_id})

        # {
        #   "station_name": "Registration",
        #   "question_number": 1,
        #   "question": "testing",
        #   "type": "text",
        #   "required": true,
        #   "options": ["one", "two", "three"]
        # }

        # returns {"question_id": 1}

        # assuming types already added

@app.route("/delete_question", methods=["DELETE"])
def delete_question():
    with db.getconn() as connection:
        cursor = connection.cursor()

        data = request.get_json()
        print(data)

        station_name = data["station_name"]
        question_num = data["question_number"]

        station_id_query = (
                """SELECT station_id FROM station WHERE station_name = '{0}'""".format(
                    station_name
                )
        )

        cursor.execute(station_id_query)
        station_id = cursor.fetchall()#[0][0]

        if not station_id:
            return "station doesn't exist"

        station_id = station_id[0][0]

        connection.commit()

        question_id_query = (
            """SELECT question_id FROM question WHERE Station_id = %s AND question_num = %s"""
        )

        question_data = (
           station_id,
           question_num
        )

        cursor.execute(question_id_query, question_data)

        question_id = cursor.fetchall()#[0][0]

        if not question_id:
            return "question doesn't exist"

        question_id = question_id[0][0]

        connection.commit()

        # Delete question
        delete_question_query = (
            """DELETE FROM question WHERE question_id = {0}""".format(question_id)
        )
        cursor.execute(delete_question_query)
        connection.commit()
        print("question deleted from question table")

        return "question successfully deleted"

        # {
        #    "station_name": "Registration",
        #    "question_number": 1,
        # }


@app.route("/update_question", methods=["PATCH"])
def update_question():
    with db.getconn() as connection:
        cursor = connection.cursor()

        data = request.get_json()
        print(data)

        station_name = data["station_name"]
        questions = data["questions"]

        station_id_query = (
                """SELECT station_id FROM station WHERE station_name = '{0}'""".format(
                    station_name
                )
        )

        cursor.execute(station_id_query)
        station_id = cursor.fetchall()#[0][0]

        if not station_id:
            return "station doesn't exist"

        station_id = station_id[0][0]

        connection.commit()


        count = 0

        for q in questions:
            question_num = q["question_number"]
            question = q["question"]
            type = q["type"]
            is_required = q["required"]
            options = q["options"]

            #print(q)

            type_id_query = (
            """SELECT type_id FROM type WHERE type_info = '{0}'""".format(
                    type
                )
            )

            cursor.execute(type_id_query)
            type_id = cursor.fetchall()#[0][0]

            if not type_id:
                return "type doesn't exist"

            type_id = type_id[0][0]

            connection.commit()

            postgres_update_query = (
                """ UPDATE question SET question = %s, type_id = %s, required = %s, options = %s 
                    WHERE station_id = %s AND question_num = %s"""
            )
            record_to_update = (
                question,
                type_id,
                is_required,
                options,
                station_id,
                question_num
            )
            cursor.execute(postgres_update_query, record_to_update)
            connection.commit()
            count = count + 1
            print("ok")

        print(str(count) + " questions updated")

        return "questions updated for station {}".format(str(station_name))

    # {"station_name": "Registration",
    #"questions": [ 
    #    {"question_number": 1, 
    #       "question": "testing", 
    #       "type": "text", 
    #       "required": true, 
    #       "options": ["one", "two", "three"]
    #    }, 
    #    {"question_number": 2, 
    #       "question": "testing2", 
    #       "type": "text", 
    #       "required": true, 
    #       "options": ["one", "two", "three"]
    #    }
    #    ] 
    #}