use cacic_vhou_;

select nome_aluno from aluno where nome_aluno = "a_teste" and ra_aluno = "171257180" union select null where not exists (select * from aluno where nome_aluno = "a_teste" and ra_aluno = "171257180");

delete from coordenador where nome_coord = "juan";

delete from aluno where ra_aluno = "171257111";
	
delete from usuario where id_usuario = 595;

/*
 * Ordem de delete:
 * Aluno ou coordenador primeiro >> usuário.
 * curso >> ent_academica.
 * atividade_extra 
 *
 *   
 */


create table usuario(
 id_usuario integer(3) not null primary key,
 nome_usuario varchar(20),
 curso varchar(20),
 tipo_usuario varchar(20),
 email_usuario varchar(20),
 senha varchar(20)
);

create table aluno(
 id_aluno_usuario integer(3) not null,
 id_aluno integer(3) not null auto_increment,
 ra_aluno varchar(20) not null,
 nome_aluno varchar(20) not null,
 nome_ent_acad_aluno varchar(20) not null,
 ano_nascimento_aluno date,
 curso_aluno varchar(20) not null,
 tipo_usuario_aluno varchar(20),
 tipo_grad_aluno varchar(25),
 primary key (id_aluno),
 foreign key (id_aluno_usuario) references usuario(id_usuario)
);

create table coordenador(
 id_coord_usuario integer(3) not null,
 nome_coord varchar(20),
 nome_ent_acad_coord varchar(20),
 tipo_usuario_coord varchar(20),
 curso_coord varchar(20),
 data_como_coord date,
 primary key (nome_coord),
 foreign key (id_coord_usuario) references usuario(id_usuario)
);

create table ent_academica(
 nome_ent_acad varchar(20),
 ano_abertura_acad varchar(20),
 curso_ent_acad varchar(20) primary key,
 quant_alunos_acad varchar(20),
 quant_horas_avaliar_acad varchar(20)
);

create table curso(
 id_curso integer(3) primary key auto_increment,
 nome_curso varchar(35),
 ano_curso date,
 tipo_curso varchar(20),
 coordenador_curso varchar(20),
 foreign key (coordenador_curso) references coordenador(nome_coord)
);

create table atividade_extra(
 id_atividade varchar(4) not null,
 id_aluno_atividade integer(3) not null,
 data_ini_atividade varchar(20),
 data_fim_atividade varchar(20),
 nome_atividade varchar(20),
 ra_aluno_atividade varchar(20) not null,
 tipo_curso_atividade varchar(20),
 horas_atividade varchar(20),
 tipo_atividade varchar(35),
 url_atividade varchar(100),
 status_atividade varchar(20),
 primary key(id_aluno_atividade)
 /*foreign key (id_aluno_atividade) references aluno(id_aluno)*/
);
