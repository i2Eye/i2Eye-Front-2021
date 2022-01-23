begin;

-- create a bunch of stations
insert into station(station_name) values
	('Oral Health'),
	('Phlebotomy Test');

-- and a bunch of questions
with q (question, type, station_name) as
(values
	('Have you ever consumed in the past/present any form of intoxications e.g. tobacco, beedi, cigarettes (include chewing/smoking)', 'radio', 'Oral Health'),
	('If Y to having consumed, what do you consume', 'text', 'Oral Health'),
	('Are you 40 years old or above', 'radio', 'Phlebotomy Test'),
	('Are you suffering from any of the following conditions', 'checkbox', 'Phlebotomy Test')
)
insert into question (question, type, station_id)
select q.question, q.type::question_type, s.station_id from
q join station s on q.station_name=s.station_name;

-- add some patients
insert into patient(name) values
	('Moja'),
	('Newkii'),
	('Kaiju');

-- add some answers
with a (answer, patient) as
(values
	('Y', 'Moja'),
	('Y', 'Newkii'),
	('Y', 'Kaiju')
)
insert into answer(answer, patient_id, question_id)
select a.answer, p.patient_id, q.question_id from a
join question q on q.question='Have you ever consumed in the past/present any form of intoxications e.g. tobacco, beedi, cigarettes (include chewing/smoking)'
join patient p on a.patient=p.name;

with a (answer, patient) as
(values
	('Canadian Geese', 'Moja'),
	('Dog food', 'Newkii'),
	('My enemies', 'Kaiju')
)
insert into answer(answer, patient_id, question_id)
select a.answer, p.patient_id, q.question_id from a
join question q on q.question='If Y to having consumed, what do you consume'
join patient p on a.patient=p.name;

with a (answer, patient) as
(values
	('Y', 'Moja'),
	('N', 'Newkii'),
	('Y', 'Kaiju')
)
insert into answer(answer, patient_id, question_id)
select a.answer, p.patient_id, q.question_id from a
join question q on q.question='Are you 40 years old or above'
join patient p on a.patient=p.name;

with a (answer, patient) as
(values
	('Depression', 'Moja'),
	('Addicted to TikTok', 'Newkii'),
	('Healthy boi', 'Kaiju')
)
insert into answer(answer, patient_id, question_id)
select a.answer, p.patient_id, q.question_id from a
join question q on q.question='Are you suffering from any of the following conditions'
join patient p on a.patient=p.name;

commit;