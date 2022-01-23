begin;

create type question_type as enum (
	'text',
	'radio',
	'checkbox'
);

create table if not exists question (
	question_id serial primary key,
	question text not null,
	station_id int references station(station_id) on update cascade,
	type question_type not null default 'text'
);

commit;