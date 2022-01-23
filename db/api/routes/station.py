import json
from flask import current_app as app
from flask import request

from api.psql import db

@app.route("/add_station", methods=["POST"])
def add_station():
    with db.getconn() as connection:
        cursor = connection.cursor()

        data = request.get_json()
        print(data)

        station_name = data["station_name"]

        insert_station_query = (
            """INSERT INTO station (station_id, availability, station_name) 
                VALUES (DEFAULT, true, %s) RETURNING station_id"""
        )

        station_to_insert = (station_name,)

        cursor.execute(insert_station_query, station_to_insert)
        connection.commit()

        station_id = cursor.fetchall()[0][0]

        print("Successful addition of station.")
        # "Station `{}` is added".format(station_name)
        return json.dumps({"station_id": station_id})

        # {"station_name": "Registration"}

        # returns {"station_id": 1}


@app.route("/delete_station", methods=["DELETE"])
def delete_station():
    with db.getconn() as connection:
        cursor = connection.cursor()

        data = request.get_json()
        print(data)

        station_name = data["station_name"]

        # Delete station
        delete_station_query = (
            """DELETE FROM station WHERE station_name = %s"""
        )

        station_to_delete = (station_name,)

        cursor.execute(delete_station_query, station_to_delete)
        connection.commit()
        print("station deleted from station table")

        return "station successfully deleted"

@app.route("/get_availability", methods=["GET"])
def get_station_availability():
    with db.getconn() as connection:
        cursor = connection.cursor()

        postgres_select_query = """SELECT station_name, available FROM station"""
        cursor.execute(postgres_select_query)
        connection.commit()

        results = cursor.fetchall()
        results = dict(results)

        print("Successful query of station table.")
        print(results)

        # {'Tobacco Questionnare': True,
        # 'Anemia Questionnare': True,
        # 'BMI (Underweight measurement)': True,
        # 'Haemoglobin (Anemia measurement)': True,
        # 'Post campaign survey': True,
        # 'Registration': False}

        return json.dumps(results)


@app.route("/set_availability", methods=["POST"])
def set_availability():
    with db.getconn() as connection:
        cursor = connection.cursor()

        data = request.get_json()
        print(data)
        for key, value in data.items():
            postgres_select_query = (
                """UPDATE station SET available = %s WHERE station_name = %s"""
            )
            record_to_select = (
                value,
                key,
            )
            cursor.execute(postgres_select_query, record_to_select)
            connection.commit()
            print("Availability of {} station set to {}".format(key, str(value)))
            print("ok")

        return "Availability of {} station set to {}".format(key, str(value))

    # {"name": true}


@app.route("/update_station", methods=["PATCH"])
def update_station():
    with db.getconn() as connection:
        cursor = connection.cursor()

        data = request.get_json()
        print(data)

        station_name = data["station_name"]
        new_station_name = data["new_station_name"]

        station_id_query = (
            """SELECT station_id FROM station WHERE station_name = %s"""
        )
        station_to_get = (station_name,)
        cursor.execute(station_id_query, station_to_get)
        station_id = cursor.fetchall()[0]

        station_update_query = """UPDATE station SET station_name = %s WHERE station_id = %s"""
        station_to_update = (
            new_station_name,
            station_id,
        )
        cursor.execute(station_update_query, station_to_update)
        connection.commit()

        return "Data successfully updated"

        # {
        #    "station_name": "Registration",
        #    "new_station_name": "Reg2"
        # }