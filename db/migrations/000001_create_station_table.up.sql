create table if not exists station (
	station_id serial primary key,
	station_name text unique not null,
	available boolean not null default true
);
