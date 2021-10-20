use cacic_vhou_;

select nome_aluno from aluno where nome_aluno = "a_teste" and ra_aluno = "171257180" union select null where not exists (select * from aluno where nome_aluno = "a_teste" and ra_aluno = "171257180");

delete from coordenador where nome_coord = "juan";

delete from aluno where ra_aluno = "171257111";
	
delete from usuario where id_usuario = 595;

create table usuario(
 id_usuario integer(3) ,
 nome_usuario varchar(20),
 curso varchar(20),
 tipo_usuario varchar(20),
 email_usuario varchar(20),
 senha varchar(20)
);

create table aluno(
 id_aluno integer(3),
 ra_aluno varchar(20),
 nome_aluno varchar(20),
 ano_nascimento_aluno date,
 curso_aluno varchar(20),
 tipo_usuario_aluno varchar(20),
 tipo_grad_aluno varchar(25)
);

create table coordenador(
 id_coord integer(3),
 nome_coord varchar(20),
 tipo_usuario_coord varchar(20),
 curso_coord varchar(20),
 data_como_coord date
);

create table ent_academica(
 nome_ent_acad varchar(20),
 ano_abertura_acad varchar(20),
 quant_alunos_acad varchar(20),
 quant_horas_avaliar_acad varchar(20)
);

create table curso(
 nome_curso varchar(35),
 ano_curso varchar(20),
 tipo_curso varchar(20),
 coordenador_curso varchar(35)
);

create table atividade_extra(
 id_atividade varchar(4),
 data_ini_atividade varchar(20),
 data_fim_atividade varchar(20),
 nome_atividade varchar(20),
 ra_aluno_atividade varchar(20),
 tipo_curso_atividade varchar(20),
 horas_atividade varchar(20),
 tipo_atividade varchar(35),
 url_atividade varchar(100),
 status_atividade varchar(20)
);