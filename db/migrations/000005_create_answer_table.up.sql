create table if not exists answer (
	answer_id serial primary key,
	answer text not null,
	patient_id int references patient(patient_id) on update cascade,
	question_id int references question(question_id) on update cascade
);