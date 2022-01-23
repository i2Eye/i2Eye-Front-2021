create table patient_station_completed (
	patient_id int references patient(patient_id) on update cascade on delete cascade,
	station_id int references station(station_id) on update cascade on delete cascade,
	constraint patient_station_pk primary key (patient_id, station_id)
);