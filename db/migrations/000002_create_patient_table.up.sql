create table if not exists patient (
	patient_id serial primary key,
	name text,
	available boolean not null default true,
	current_station int references station(station_id) on update cascade on delete set null
);