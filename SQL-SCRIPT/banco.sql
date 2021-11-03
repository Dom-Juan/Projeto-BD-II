use cacic_vhou_;

alter table usuario modify email_usuario varchar(255);

/* Criando o bando de dados */
create table usuario(
 id_usuario integer(3) not null primary key,
 nome_usuario varchar(20),
 curso varchar(20),
 tipo_usuario varchar(20),
 email_usuario varchar(255),
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

create table horas_complementares (
 id_hora int(3) not null,
 nome_hora varchar(20) not null,
 carga_hora varchar(20) not null,
 limite_hora varchar(20) not null,
 procentagem_hora int not null,
 nome_curso_hora varchar(20) not null,
 primary key (id_hora),
 foreign key (nome_curso_hora) references curso(nome_curso)
);

create table tb_auditoria (
 id_ int(3) not null auto_increment,
 nome_tabela varchar(20) not null,
 data_alterado date not null,
 sql_usado varchar(8000),
 nome_usuario_responsavel varchar(20),
 primary key (id_)
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

select * from horas_complementares hc;

delete from atividade_extra where id_atividade = 1896;
/* FIM SQL Atividade Extra */

/* SQL Curso */

/* FIM SQL Curso */

/* Triggers */
delimiter //
create trigger depois_de_inserir_usuario
 after insert 
 on usuario for each row
begin
	insert 
	call _criar_log_('Query feita');
	call _verifica_casos_null_(0, 100, 'nome_usuario', 'usuario');
end $$
delimiter //

/* FIM Triggers */


/* Procedures */

delimiter $$
create procedure `deletar_usuario_null`(
 nome_usuario varchar(20)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 /* Realizando querys */
 delete from usuario where id_usuario = null;
 delete from usuario where nome_usuario = null;
 delete from usuario where curso = null;
 delete from usuario where tipo_usuario = null;
 delete from usuario where email_usuario = null;
 delete from usuario where senha = null;
 /* Registrando a alteração. */
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'usuario', @agora, 'delete from usuario where id_usuario = null', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'usuario', @agora, 'delete from usuario where nome_usuario = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'usuario', @agora, 'delete from usuario where curso = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'usuario', @agora, 'delete from usuario where tipo_usuario = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'usuario', @agora, 'delete from usuario where email_usuario = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'usuario', @agora, 'delete from usuario where senha = null;', nome_usuario);
end$$
delimiter ;

delimiter $$
create procedure `deletar_aluno_null`(
 nome_usuario varchar(20)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 /* Realizando querys */
 delete from aluno where id_aluno_usuario = null;
 delete from aluno where id_aluno = null;
 delete from aluno where ra_aluno = null;
 delete from aluno where nome_aluno = null;
 delete from aluno where nome_ent_acad_aluno = null;
 delete from aluno where ano_nascimento_aluno = null;
 delete from aluno where curso_aluno = null;
 delete from aluno where tipo_usuario_aluno = null;
 delete from aluno where tipo_grad_aluno = null;
 /* Registrando a alteração. */
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'aluno', @agora, 'delete from aluno where id_aluno_usuario = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'aluno', @agora, 'delete from aluno where id_aluno = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'aluno', @agora, 'delete from aluno where ra_aluno = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'aluno', @agora, 'delete from aluno where nome_aluno = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'aluno', @agora, 'delete from aluno where nome_ent_acad_aluno = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'aluno', @agora, 'delete from aluno where curso_aluno = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'aluno', @agora, 'delete from aluno where tipo_usuario_aluno = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'aluno', @agora, 'delete from aluno where tipo_grad_aluno = null;', nome_usuario);
end$$
delimiter ;

delimiter $$
create procedure `deletar_coord_null`(
 nome_usuario varchar(20)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 /* Realizando querys */
 delete from coordenador where id_coord_usuario = null;
 delete from coordenador where nome_coord = null;
 delete from coordenador where nome_ent_acad_coord = null;
 delete from coordenador where tipo_usuario_coord = null;
 delete from coordenador where curso_coord = null;
 delete from coordenador where data_como_coord = null;
 /* Registrando a alteração. */
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'coordenador', @agora, 'delete from coordenador where id_coord_usuario = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'coordenador', @agora, 'delete from coordenador where nome_coord = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'coordenador', @agora, 'delete from coordenador where nome_ent_acad_coord = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'coordenador', @agora, 'delete from coordenador where tipo_usuario_coord = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'coordenador', @agora, 'delete from coordenador where curso_coord = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'coordenador', @agora, 'delete from coordenador where data_como_coord = null;', nome_usuario);
end$$
delimiter ;

delimiter $$
create procedure `deletar_curso_null`(
 nome_usuario varchar(20)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 /* Realizando querys */
 delete from curso where nome_curso = null;
 delete from curso where ano_curso = null;
 delete from curso where tipo_curso = null;
 delete from curso where coordenador_curso = null;
 /* Registrando a alteração. */
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'curso', @agora, 'delete from curso where nome_curso = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'curso', @agora, 'delete from curso where ano_curso = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'curso', @agora, 'delete from curso where tipo_curso = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'curso', @agora, 'delete from curso where coordenador_curso = null;', nome_usuario);
end$$
delimiter ;

delimiter $$
create procedure `deletar_ent_acad_null`(
 nome_usuario varchar(20)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 /* Realizando querys */
 delete from ent_academica where nome_ent_acad = null;
 delete from ent_academica where ano_abertura_acad = null;
 delete from ent_academica where curso_ent_acad = null;
 delete from ent_academica where quant_alunos_acad = null;
 delete from ent_academica where quant_horas_avaliar_acad = null;
 /* Registrando a alteração. */
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'ent_academica', @agora, 'delete from ent_academica where nome_ent_acad = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'ent_academica', @agora, 'delete from ent_academica where ano_abertura_acad = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'ent_academica', @agora, 'delete from ent_academica where curso_ent_acad = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'ent_academica', @agora, 'delete from ent_academica where quant_alunos_acad = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'ent_academica', @agora, 'delete from ent_academica where quant_horas_avaliar_acad = null;', nome_usuario);
end$$
delimiter ;

delimiter $$
create procedure `deletar_ativ_extra_null`(
 nome_usuario varchar(20)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 /* Realizando querys */
 delete from atividade_extra where id_atividade = null;
 delete from atividade_extra where id_aluno_atividade = null;
 delete from atividade_extra where data_ini_atividade = null;
 delete from atividade_extra where data_fim_atividade = null;
 delete from atividade_extra where nome_atividade = null;
 delete from atividade_extra where ra_aluno_atividade = null;
 delete from atividade_extra where tipo_curso_atividade = null;
 delete from atividade_extra where horas_atividade = null;
 delete from atividade_extra where tipo_atividade = null;
 delete from atividade_extra where url_atividade = null;
 delete from atividade_extra where status_atividade = null;
 /* Registrando a alteração. */
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where id_atividade = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where id_aluno_atividade = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where data_ini_atividade = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where data_fim_atividade = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where nome_atividade = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where ra_aluno_atividade = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where tipo_curso_atividade  = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where horas_atividade  = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where tipo_atividade  = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where url_atividade  = null;', nome_usuario);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) values (default, 'atividade_extra', @agora, 'delete from atividade_extra where status_atividade  = null;', nome_usuario);
end$$
delimiter ;

delimiter $$
create procedure `inserir_horas_tabela`(
 id_ int(3),
 nome_ varchar(20),
 carga_ varchar(20),
 limite_ varchar(20),
 procentagem_ int,
 nome_curso_ varchar(20),
 nome_r varchar(20)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

/* Procedure para inserir na tabela horas */
 insert into horas_complementares (
 id_hora,
 nome_hora,
 carga_hora,
 limite_hora,
 procentagem_hora,
 nome_curso_hora
) values (
 id_,
 nome_,
 carga_,
 limite_,
 procentagem_,
 nome_curso_
);
 insert into tb_auditoria (
 id_,
 nome_tabela,
 data_alterado,
 sql_usado,
 nome_usuario_responsavel
)values (
 default,
 'horas_complementares',
 @agora,
 'insert into horas_complementares (id_hora, nome_hora, carga_hora, limite_hora, procentagem_hora, nome_curso_hora) values (id_, nome_, carga_, limite_, procentagem_, nome_curso_);',
 nome_r
);
end$$
delimiter ;

/* Procedure para deletar coluna na tabela horas */
delimiter $$
create procedure `deletar_horas_tabela`(
 id_ int(3),
 nome_ varchar(20),
 nome_responsavel varchar(20)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 delete from horas_complementares where id_hora = id_ and nome_hora = nome_;

 insert into tb_auditoria (
 id_,
 nome_tabela,
 data_alterado,
 sql_usado,
 nome_usuario_responsavel
)values (
 default,
 'horas_complementares',
 @agora,
 'delete from horas_complementares as h where id_hora = id_ and nome_hora = nome_;',
 nome_responsavel
);
end$$
delimiter ;

delimiter ;

delimiter $$
 create procedure `_criar_log_`(msg varchar(100))
  begin
	declare cmd varchar(2000);
	select cast(current_timestamp() as char(50)) into @hoje;
	set cmd = concat(msg ,'>>',@hoje);
	select concat('D:\\', @hoje,'_' ,'log.txt') as arquivo;
	select cmd into outfile convert(arquivo, char);
  end;
delimiter ;

call inserir_horas_tabela('1', 'Monitoria', '2', '10 horas', '10', 'Computação', 'juan');
call deletar_horas_tabela('467', 'Curso Online', 'juan');

/* FIM Procedures */

/* Call de procedures */
call _criar_log_('teste') ;
call deletar_ativ_extra_null();

/* FIM Call de procedures */

/* Drop de procedures */
/* Inserindo colunas */
drop procedure inserir_horas_tabela;

/* Deletando colunas null */
drop procedure deletar_usuario_null;
drop procedure deletar_aluno_null;
drop procedure deletar_coord_null;
drop procedure deletar_curso_null;
drop procedure deletar_ent_acad_null;
drop procedure deletar_ativ_extra_null;

/* Deletando colunas */
drop procedure deletar_horas_tabela;

drop procedure _criar_log_; 
drop procedure _verifica_casos_null_;
/* FIM Drop de procedures */


/* FIM SQL Banco de Dados. */