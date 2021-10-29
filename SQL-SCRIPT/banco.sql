use cacic_vhou_;

/* Criando o bando de dados */
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
 curso_ent_acad varchar(35),
 quant_alunos_acad varchar(20),
 quant_horas_avaliar_acad varchar(20),
 primary key (nome_ent_acad),
 foreign key (curso_ent_acad) references curso(nome_curso)
);

create table curso(
 nome_curso varchar(35),
 ano_curso date,
 tipo_curso varchar(20),
 coordenador_curso varchar(20),
 primary key (nome_curso),
 foreign key (coordenador_curso) references coordenador(nome_coord)
);

create table atividade_extra(
 id_atividade varchar(4) not null,
 id_aluno_atividade integer(3),
 data_ini_atividade varchar(20),
 data_fim_atividade varchar(20),
 nome_atividade varchar(20),
 ra_aluno_atividade varchar(20) not null,
 tipo_curso_atividade varchar(20),
 horas_atividade varchar(20),
 tipo_atividade varchar(35),
 url_atividade varchar(100),
 status_atividade varchar(20),
 primary key(id_atividade),
 foreign key (id_aluno_atividade) references aluno(id_aluno_usuario)
);

/* SQL Banco de dados: */

/*
 * Ordem de delete:
 * 		Deletando usuário: Aluno ou coordenador primeiro >> usuário.
 * 		Deletando entidades academicas (direto).
 * 		Deletando atividades extras (direto). 
 *
 *   
 */

/* SQL Usuario */
insert into usuario (
 id_usuario, 
 nome_usuario, 
 curso, 
 tipo_usuario, 
 email_usuario, 
 senha
) values (
 555, 
 'e', 
 'Computação', 
 'aluno', 
 'e@email.com', 
 'abc123'
);

delete from usuario where id_usuario = 555;
/* FIM SQL Usuario */

/* SQL Aluno */
insert into aluno values (
 181,
 default,
 '171257111',
 'teste_',
 'CACIC',
 '1998-01-20',
 'Computação',
 'aluno',
 'bacharelado'
);

delete from aluno where id_aluno_usuario = 181;
/* FIM SQL Aluno */

/* SQL Coordenador */
insert into coordenador (
 id_coord_usuario, 
 nome_coord, 
 nome_ent_acad_coord, 
 tipo_usuario_coord, 
 curso_coord,
 data_como_coord
) values (
 181,
 'teste_',
 'CACIC',
 'coordenador',
 'Computação',
 '2021-10-28'
);

delete from coordenador where id_coord_usuario = 181;
/* FIM SQL Coordenador */

/* SQL Atividade Extra */
insert into atividade_extra (
 id_atividade,
 id_aluno_atividade,
 data_ini_atividade,
 data_fim_atividade,
 nome_atividade,
 ra_aluno_atividade,
 tipo_curso_atividade,
 horas_atividade,
 tipo_atividade,
 url_atividade,
 status_atividade
) values (
 'ad12',
 123,
 '2021-10-1',
 '2021-10-2',
 'Batata',
 '17344343',
 'Computação',
 '2horas',
 'andar',
 'a',
 'pendente'
);

delete from atividade_extra where id_atividade = 1896;
/* FIM SQL Atividade Extra */

/* SQL Curso */

/* FIM SQL Curso */

/* Triggers */
delimiter $$

create trigger depois_de_inserir_usuario
 after insert 
 on usuario for each row
begin
	call _criar_log_('Query feita');
	call _verifica_casos_null_(0, 100, 'nome_usuario', 'usuario');
end $$

delimiter ;

/* FIM Triggers */


/* Procedures */

delimiter $$

create procedure `_verifica_casos_null_`(
 inicio int,
 fim int,
 atributo1 varchar(20),
 tabela varchar(20)
)
begin
	while inicio <= fim DO
		set inicio = inicio + 1;
		select * from tabela where atributo1 = null;
	end while;
end$$

delimiter ;

delimiter $$
 create procedure `_criar_log_`(msg varchar(100))
  begin
	declare cmd varchar(2000);
	select cast(current_timestamp() as char(10)) into @hoje;
	set cmd = concat(msg ,'>>',@hoje);
	select cmd into outfile 'D:\log.txt';
  end;
delimiter ;

/* FIM Procedures */

call _criar_log_('teste') ;

Drop procedure _criar_log_; 
Drop procedure _verifica_casos_null_;
drop trigger depois_de_inserir_usuario;

/* FIM SQL Banco de Dados. */