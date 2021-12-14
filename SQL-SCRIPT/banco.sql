/* Usando o banco de dados. */
use cacic_vhou_;

/* Checkagem de status de triggers e procedures */
show procedure status;
show triggers in cacic_vhou_;

/* Alterações feitas nas tabelas. */

/* Não precisa executar isso ao criar o banco, as mudanças já foram implementadas no create table */
alter table usuario modify email_usuario varchar(255);
alter table usuario modify nome_usuario varchar(50);
alter table usuario modify curso varchar(50);
alter table usuario modify senha varchar(25);

alter table aluno modify nome_aluno varchar(50);
alter table aluno modify nome_ent_acad_aluno varchar(50);
alter table aluno modify curso_aluno varchar(50);

alter table coordenador modify nome_coord varchar(50);
alter table coordenador modify nome_ent_acad_coord varchar(50);
alter table coordenador modify curso_coord varchar(50);

alter table curso modify nome_curso varchar(50);
alter table curso modify coordenador_curso varchar(50);

alter table ent_academica modify nome_ent_acad varchar(50);
alter table ent_academica  modify curso_ent_acad varchar(50);

alter table atividade_extra modify nome_atividade varchar(50);

alter table horas_complementares modify nome_hora varchar(255);

alter table tb_auditoria  modify nome_usuario_responsavel varchar(50);

/* FIM Alterações feitas nas tabelas. */

/* Criando o bando de dados */
create table usuario(
 id_usuario integer(3) not null primary key,
 nome_usuario varchar(50),
 curso varchar(50),
 tipo_usuario varchar(20),
 email_usuario varchar(255),
 senha varchar(25)
);

create table aluno(
 id_aluno_usuario integer(3) not null,
 id_aluno integer(3) not null auto_increment,
 ra_aluno varchar(20) not null,
 nome_aluno varchar(50) not null,
 nome_ent_acad_aluno varchar(50) not null,
 ano_nascimento_aluno date,
 curso_aluno varchar(50) not null,
 tipo_usuario_aluno varchar(20),
 tipo_grad_aluno varchar(25),
 primary key (id_aluno),
 foreign key (id_aluno_usuario) references usuario(id_usuario)
);

create table coordenador(
 id_coord_usuario integer(3) not null,
 nome_coord varchar(50),
 nome_ent_acad_coord varchar(50),
 tipo_usuario_coord varchar(20),
 curso_coord varchar(50),
 data_como_coord date,
 primary key (nome_coord),
 foreign key (id_coord_usuario) references usuario(id_usuario)
);

create table curso(
 nome_curso varchar(50),
 ano_curso date,
 tipo_curso varchar(20),
 coordenador_curso varchar(50),
 primary key (nome_curso),
 foreign key (coordenador_curso) references coordenador(nome_coord)
);

create table ent_academica(
 nome_ent_acad varchar(50),
 ano_abertura_acad varchar(20),
 curso_ent_acad varchar(50),
 quant_alunos_acad varchar(20),
 quant_horas_avaliar_acad varchar(20),
 primary key (nome_ent_acad),
 foreign key (curso_ent_acad) references curso(nome_curso)
);

create table aux_curso(
 id_aux_curso int(3),
 id_aluno_aux_curso int(3),
 nome_aux_curso varchar(50),
 primary key(id_aux_curso),
 foreign key (nome_aux_curso) references curso(nome_curso),
 foreign key (id_aluno_aux_curso) references aluno(id_aluno_usuario)
);

create table horas_complementares (
 id_hora int(3) not null,
 nome_hora varchar(255) not null,
 carga_hora varchar(20) not null,
 limite_hora varchar(20) not null,
 procentagem_hora int not null,
 nome_curso_hora varchar(20) not null,
 primary key (id_hora),
 foreign key (nome_curso_hora) references curso(nome_curso)
);

create table atividade_extra(
 id_atividade varchar(4) not null,
 id_aluno_atividade integer(3),
 data_ini_atividade varchar(20),
 data_fim_atividade varchar(20),
 nome_atividade varchar(50),
 ra_aluno_atividade varchar(20) not null,
 tipo_curso_atividade varchar(20),
 horas_atividade varchar(20),
 tipo_atividade varchar(35),
 url_atividade varchar(100),
 status_atividade varchar(20),
 primary key(id_atividade),
 foreign key (id_aluno_atividade) references aluno(id_aluno_usuario)
);

create table tb_auditoria (
 id_ int(3) not null auto_increment,
 nome_tabela varchar(50) not null,
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
 321, 
 'Coord teste', 
 'Computação', 
 'coordenador', 
 'coord_teste@email.com', 
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

/* Triggers estão dando conflito com o insert. */
drop trigger if exists `check_table_usuario`;
delimiter $$
/* Triggers para deletar colunas corrompidas no banco de dados */
create trigger check_table_usuario before insert on usuario for each row
begin
	call deletar_usuario_null('sistema'); 
end;
delimiter ;

drop trigger if exists `check_table_aluno`;
delimiter $$
create trigger check_table_aluno before insert on aluno for each row
begin
	call deletar_aluno_null('sistema'); 
end;
delimiter ;

drop trigger if exists `check_table_coord`;
delimiter $$
create trigger check_table_coord before insert on coordenador for each row
begin
	call deletar_coord_null('sistema'); 
end;
delimiter ;

drop trigger if exists `check_table_curso`;
delimiter $$
create trigger check_table_curso before insert on curso for each row
begin
	call deletar_curso_null('sistema'); 
end;
delimiter ;

drop trigger if exists `check_table_ent_acad`;
delimiter $$
create trigger check_table_ent_acad before insert on ent_academica for each row
begin
	call deletar_ent_acad_null('sistema'); 
end;
delimiter ;

drop trigger if exists `check_table_ativ_extra`;
delimiter $$
create trigger check_table_ativ_extra before insert on atividade_extra for each row
begin
	call deletar_ativ_extra_null('sistema'); 
end;
/* Triggers para deletar colunas corrompidas no banco de dados */
delimiter ;

/* FIM Triggers */


/* Procedures */

/* Procedure atualizar usuário */
delimiter $$
create procedure `atualizar_usuario_tabela`(
 id_ int(3),
 nome_usuario_ varchar(50),
 curso_ varchar(50),
 email_usuario_ varchar(255),
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 update usuario set nome_usuario = nome_usuario_ where id_usuario = id_;
 update usuario set curso = curso_ where id_usuario = id_;
 update usuario set email_usuario = email_usuario_ where id_usuario = id_;

 insert into tb_auditoria (
  id_,
  nome_tabela,
  data_alterado,
  sql_usado,
  nome_usuario_responsavel
 )values (
  default,
  'usuario',
  @agora,
  'update set usuario nome_usuario = nome_usuario_ where id_usuario = id_; update set usuario curso = curso_ where id_usuario = id_; update set usuario email_usuario = email_usuario_ where id_usuario = id_;',
  nome_responsavel
 ); 
end;
delimiter ;

/* Procedure de atualizar a senha do usuário. */
delimiter $$
create procedure `atualizar_usuario_senha_tabela`(
 id_ int(3),
 senha_nova varchar(25),
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 update usuario set senha = senha_nova where id_usuario = id_;

 insert into tb_auditoria (
  id_,
  nome_tabela,
  data_alterado,
  sql_usado,
  nome_usuario_responsavel
 )values (
  default,
  'usuario',
  @agora,
  'update set usuario senha = nova_senha where id_usuario = id_;',
  nome_responsavel
 ); 
end;
delimiter ;


/* Procedure atualizar aluno */
delimiter $$
create procedure `atualizar_aluno_tabela`(
 id_usuario int(3),
 ra_aluno_ varchar(20),
 nome_aluno_ varchar(50),
 nome_ent_acad_aluno_ varchar(50),
 ano_nascimento_aluno_ date,
 tipo_grad_aluno_ varchar(25),
 nome_r varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 update aluno set ra_aluno = ra_aluno_ where id_aluno_usuario = id_usuario;
 update aluno set nome_aluno = nome_aluno_ where id_aluno_usuario = id_usuario;
 update aluno set nome_ent_acad_aluno = nome_ent_acad_aluno_ where id_aluno_usuario = id_usuario;
 update aluno set ano_nascimento_aluno = ano_nascimento_aluno_ where id_aluno_usuario = id_usuario;
 update aluno set tipo_grad_aluno = tipo_grad_aluno_ where id_aluno_usuario = id_usuario;

 insert into tb_auditoria (
 id_,
 nome_tabela,
 data_alterado,
 sql_usado,
 nome_usuario_responsavel
)values (
 default,
 'aluno',
 @agora,
 'update aluno set ra_aluno = ra_aluno_ where id_aluno_usuario = id_usuario; update aluno set nome_aluno = nome_aluno_ where id_aluno_usuario = id_usuario; update aluno set nome_ent_acad_aluno = nome_ent_acad_aluno_ where id_aluno_usuario = id_usuario; update aluno set ano_nascimento_aluno = ano_nascimento_aluno_ where id_aluno_usuario = id_usuario; update aluno set tipo_grad_aluno = tipo_grad_aluno_ where id_aluno_usuario = id_usuario;',
 nome_r
);
end$$
delimiter ;

/* Procedure de inserção na tabela de horas */
delimiter $$
create procedure `inserir_horas_tabela`(
 id_ int(3),
 nome_ varchar(255),
 carga_ varchar(20),
 limite_ varchar(20),
 procentagem_ int,
 nome_curso_ varchar(20),
 nome_r varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

/* Inserindo na tabela */
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

/* Procedure de atualização na tabela de horas */
delimiter $$
create procedure `atualizar_horas_tabela`(
 id_ int(3),
 nome_ varchar(255),
 carga_ varchar(20),
 limite_ varchar(20),
 procentagem_ int,
 nome_r varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 update horas_complementares set nome_hora = nome_ where id_hora = id_;
 update horas_complementares set carga_hora = carga_ where id_hora = id_;
 update horas_complementares set limite_hora = limite_ where id_hora = id_;
 update horas_complementares set procentagem_hora = procentagem_ where id_hora = id_;

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
 'update horas_complementares set nome_hora = nome_ where id_hora = id_; update horas_complementares set carga_hora = carga_ where id_hora = id_; update horas_complementares set limite_hora = limite_ where id_hora = id_; update horas_complementares set procentagem_hora = procentagem_ where id_hora = id_;',
 nome_r
);
end$$
delimiter ;

/* Procedure para deletar coluna na tabela horas */
delimiter $$
create procedure `deletar_horas_tabela`(
 id_ int(3),
 nome_ varchar(255),
 nome_responsavel varchar(50)
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

/* Procedure de inserção na tabela coordenador */
delimiter $$
create procedure `inserir_coord_tabela`(
 id_ int(3),
 nome_ varchar(50),
 nome_ent_acad_ varchar(50),
 tipo_usuario_ varchar(20),
 curso_ varchar(20),
 data_como_coord date,
 nome_responsavel varchar(50)
)
begin
 select cast(current_timestamp() as varchar(50)) into @agora;
 insert into coordenador (id_coord_usuario, nome_coord, nome_ent_acad_coord, tipo_usuario_coord, curso_coord, data_como_coord)
  values
 (id_, nome_, nome_ent_acad_, tipo_usuario_, curso_, data_como_coord);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) 
  values 
 (
  default,
  'coordenador',
  @agora, 
  'insert into coordenador (id_coord_usuario, nome_coord, nome_ent_acad_coord, tipo_usuario_coord, curso_coord, data_como_coord) values (id_, nome_, nome_ent_acad_, tipo_usuario_, curso_, data_como_coord);',
  nome_responsavel
 );
end;
delimiter ;

/* Atualizar tabela coordenador*/
delimiter $$
create procedure `atualizar_coord_tabela`(
 id_ int(3),
 nome_ varchar(50),
 nome_ent_acad_ varchar(50),
 data_como_coord date,
 nome_responsavel varchar(50)
)
begin
 select cast(current_timestamp() as varchar(50)) into @agora;

 #alter table curso drop foreign key curso_ibfk_1;
 SET FOREIGN_KEY_CHECKS = 0;
 
 update coordenador set nome_coord = nome_ where id_coord_usuario = id_;
 update coordenador set nome_ent_acad_coord = nome_ent_acad_ where id_coord_usuario = id_;
 update coordenador set data_como_coord = data_como_coord where id_coord_usuario = id_;
 update tb_auditoria  set nome_usuario_responsavel = nome_ where nome_usuario_responsavel = nome_responsavel; 

 #alter table curso add constraint curso_ibfk_1 foreign key (`coordenador_curso`) references coordenador(`nome_coord`);
 SET FOREIGN_KEY_CHECKS = 1;

 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) 
  values 
 (
  default,
  'coordenador',
  @agora, 
  'update coordenador set nome_coord = nome_ where id_coord_usuario = id_; update coordenador set nome_ent_acad_coord = nome_ent_acad_ where id_coord_usuario = id_; update coordenador set data_como_coord = data_como_coord where id_coord_usuario = id_;',
  nome_responsavel
 );
end;
delimiter ;

/* Procedure de deletar uma linha na tabela coordenador */
delimiter $$
create procedure `deletar_coord_tabela`(id_ int(3), nome_ varchar(50), nome_responsavel varchar(50))
begin
 delete from coordenador where id_coord_usuario = id_;
 delete from usuario where usuario.nome_usuario = nome_ and usuario.id_usuario = id_; 
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) 
  values 
 (
  default,
  'coordenador',
  @agora, 
  'delete from coordenador where id_coord_usuario = id_; delete from usuario where usuario.nome_usuario = nome_ and usuario.id_usuario = id_;',
  nome_responsavel
 );
end;
delimiter ;

/* Procedure de inserção de curso. */
delimiter $$
create procedure `inserir_curso_tabela`(
 nome_ varchar(50),
 ano_ date,
 tipo_ varchar(20),
 coordenador_ varchar(20),
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 insert into curso (nome_curso, ano_curso, tipo_curso, coordenador_curso) values (nome_, ano_, tipo_, coordenador_);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel)
  values
 (default, 'curso', @agora, 'insert into curso (nome_curso, ano_curso, tipo_curso, coordenador_curso) values (nome_, ano_, tipo_, coordenador_);', nome_responsavel);
end;
delimiter ;

/* Procedure de deletar uma coluna de curso. */
delimiter $$
create procedure `inserir_aux_curso_tabela`(
 id_aux_curso_ int(3),
 id_aluno_aux_curso_ int(3),
 nome_aux_curso_ varchar(50),
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 insert into aux_curso (id_aux_curso, id_aluno_aux_curso, nome_aux_curso) values (id_aux_curso_, id_aluno_aux_curso_, nome_aux_curso_);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel)
  values
 (default, 'aux_curso', @agora, 'insert into aux_curso (id_aux_curso, id_aluno_aux_curso, nome_aux_curso) values (id_aux_curso_, id_aluno_aux_curso_, nome_aux_curso_);', nome_responsavel);
end;
delimiter ;

/* Procedure de deletar uma coluna de curso. */
delimiter $$
create procedure `deletar_curso_tabela`(nome_curso_a_ser_deletado varchar(50), nome_responsavel varchar(50))
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 delete from curso where curso.nome_curso = nome_curso_a_ser_deletado;

 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel)
  values 
 (default, 'curso', @agora, 'delete from curso where nome_curso = nome_;', nome_responsavel);
end;
delimiter ;

/* Procedure de deletar uma coluna de aux curso. */
delimiter $$
create procedure `deletar_aux_curso_tabela`(id_aux_curso_ int(3), nome_responsavel varchar(50))
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 delete from aux_curso where aux_curso.id_aux_curso = id_aux_curso_;

 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel)
  values 
 (default, 'aux_cursocurso', @agora, 'delete from aux_curso where aux_curso.id_aux_curso = id_aux_curso_;', nome_responsavel);
end;
delimiter ;

/* Update de nome do coordenador de curso*/
delimiter $$
create procedure `atualizar_nome_coord_curso`(
 nome_antigo varchar(50), 
 nome_novo varchar(50), 
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 alter table curso drop foreign key curso_ibfk_1;
 
 update curso set coordenador_curso = nome_novo where coordenador_curso = nome_antigo;
 
 alter table curso add constraint curso_ibfk_1 foreign key (`coordenador_curso`) references coordenador(`nome_coord`);
 
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) 
 values 
  (
   default, 
   'curso', 
   @agora, 
   'alter table curso drop foreign key coordenador_curso; update curso set coordenador_curso = nome_novo where coordenador_curso = nome_antigo; alter table curso add foreign key coordenador_curso references coordenador(nome_coord);',
   nome_responsavel
  );
end;
delimiter ;

/* Update de nome do curso*/
delimiter $$
create procedure `atualizar_nome_de_curso`(
 nome_antigo varchar(50), 
 nome_novo varchar(50), 
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 
 update curso set nome_curso = nome_novo where nome_curso = nome_antigo;
 
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) 
 values 
  (
   default, 
   'curso', 
   @agora, 
   'update curso set nome_curso = nome_novo where nome_curso = nome_antigo;',
   nome_responsavel
  );
end;
delimiter ;

/* Update de um curso*/
delimiter $$
create procedure `atualizar_curso`(
 nome_antigo varchar(50), 
 nome_novo varchar(50),
 ano_curso_novo date,
 tipo_curso_novo varchar(20),
 coordenador_curso_novo varchar(50),
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 alter table curso drop foreign key curso_ibfk_1;
 alter table ent_academica drop foreign key ent_academica_ibfk_1;
 alter table horas_complementares drop foreign key horas_complementares_ibfk_1;
 
 update curso set nome_curso = nome_novo where nome_curso = nome_antigo;
 update curso set ano_curso = ano_curso_novo where nome_curso = nome_antigo;
 update curso set tipo_curso = tipo_curso_novo where nome_curso = nome_antigo;
 update curso set coordenador_curso = coordenador_curso_novo where nome_curso = nome_antigo;

 /* Atualizando nomes aonde o curso aparece. */
 update ent_academica set curso_ent_acad = nome_novo where curso_ent_acad = nome_antigo;
 update horas_complementares set nome_curso_hora = nome_novo where nome_curso_hora = nome_antigo;
 update aluno set curso_aluno = nome_novo where curso_aluno = nome_antigo;
 update coordenador set curso_coord = nome_novo where curso_coord = nome_antigo;
 update aux_curso set nome_aux_curso = nome_novo where nome_aux_curso = nome_antigo;

 alter table curso add constraint curso_ibfk_1 foreign key (`coordenador_curso`) references coordenador(`nome_coord`);
 alter table ent_academica add constraint ent_academica_ibfk_1 foreign key (`curso_ent_acad`) references curso(`nome_curso`);
 alter table horas_complementares add constraint horas_complementares_ibfk_1 foreign key (`nome_curso_hora`) references curso(`nome_curso`);
 
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel) 
 values 
  (
   default, 
   'curso', 
   @agora, 
   'update curso set nome_curso = nome_novo where nome_curso = nome_antigo; update curso set ano_curso = ano_curso_novo where nome_curso = nome_antigo; update curso set tipo_curso = tipo_curso_novo where nome_curso = nome_antigo; update curso set coordenador_curso = coordenador_curso_novo where nome_curso = nome_antigo;',
   nome_responsavel
  );
end;
delimiter ;

/* Procedure de inserir uma entidade academica. */
delimiter $$
create procedure `inserir_enti_acad_tabela`(
 nome_ varchar(50),
 ano_abertura_ varchar(20),
 curso_ varchar(50),
 quant_alunos_ varchar(20),
 quant_horas_avaliar_ varchar(20),
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;
 insert into ent_academica (nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad)
  values 
 (nome_, ano_abertura_, curso_, quant_alunos_, quant_horas_avaliar_);
 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel)
  values 
  (
   default,
   'ent_academica',
   @agora,
   'insert into ent_academica (nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad) values (nome_, ano_abertura_, curso_, quant_alunos_, quant_horas_avaliar_);',
   nome_responsavel
  );
end;
delimiter ;

/* Procedure de atualizar entidade acadêmica. */
delimiter $$
create procedure `atualizar_enti_acad_tabela`(
 nome_ varchar(50),
 ano_abertura_ varchar(20),
 curso_ varchar(50),
 quant_alunos_ varchar(20),
 quant_horas_avaliar_ varchar(20),
 nome_responsavel varchar(50)
)
begin
 /* Selecionando a data da execução da query */
 select cast(current_timestamp() as varchar(50)) into @agora;

 alter table curso drop foreign key curso_ibfk_1;
 alter table ent_academica drop foreign key ent_academica_ibfk_1;
 
 update ent_academica set nome_ent_acad = nome_ where nome_ent_acad = nome_ent_acad;
 update ent_academica set ano_abertura_acad = ano_abertura_ where nome_ent_acad = nome_ent_acad;
 update ent_academica set curso_ent_acad = curso_ where nome_ent_acad = nome_ent_acad;
 update ent_academica set quant_alunos_acad = quant_alunos_ where nome_ent_acad = nome_ent_acad;
 update ent_academica set quant_horas_avaliar_acad = quant_horas_avaliar_ where nome_ent_acad = nome_ent_acad;

 alter table curso add constraint curso_ibfk_1 foreign key (`coordenador_curso`) references coordenador(`nome_coord`);
 alter table ent_academica add constraint ent_academica_ibfk_1 foreign key (`curso_ent_acad`) references curso(`nome_curso`);

 insert into tb_auditoria (id_, nome_tabela, data_alterado, sql_usado, nome_usuario_responsavel)
  values 
  (
   default,
   'ent_academica',
   @agora,
   'update ent_academica set nome_ent_acad = nome_ where nome_ent_acad = nome_ent_acad; update ent_academica set ano_abertura_acad = ano_abertura_ where nome_ent_acad = nome_ent_acad; update ent_academica set curso_ent_acad = curso_ where nome_ent_acad = nome_ent_acad; update ent_academica set quant_alunos_acad = quant_alunos_ where nome_ent_acad = nome_ent_acad; update ent_academica set quant_horas_avaliar_acad = quant_horas_avaliar_ where nome_ent_acad = nome_ent_acad;',
   nome_responsavel
  );
end;
delimiter ;

/* Procedures para deletar colunas corrompidas no banco. */
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

/* Call de procedures */

/* Testando as procedures */
call inserir_horas_tabela('1', 'Monitoria', '2', '10 horas', '10', 'Computação', 'juan');
call deletar_horas_tabela('467', 'Curso Online', 'juan');

call inserir_curso_tabela('Curso teste', '1981-10-10', 'mat1010', 'juan', 'juan');
call deletar_curso_tabela('Computação2', 'juan');

call inserir_coord_tabela('321', 'Coordenador Teste', 'Sem entidade', 'coordenador', 'Computação', '2021-10-11', 'juan');

call deletar_coord_tabela('321', 'Coord teste', 'juan'); 
/* FIM Call de procedures */

/* Drop de procedures */
/* Inserindo colunas */
drop procedure if exists inserir_horas_tabela;
drop procedure if exists inserir_curso_tabela;
drop procedure if exists inserir_enti_acad_tabela;
drop procedure if exists inserir_coord_tabela;
drop procedure if exists inserir_aux_curso_tabela;

/* Update de colunas */
drop procedure if exists atualizar_usuario_tabela;
drop procedure if exists atualizar_usuario_senha_tabela;
drop procedure if exists atualizar_aluno_tabela;
drop procedure if exists atualizar_nome_coord_curso;
drop procedure if exists atualizar_nome_de_curso;
drop procedure if exists atualizar_curso;
drop procedure if exists atualizar_coord_tabela;

/* Deletando colunas null */
drop procedure if exists deletar_usuario_null;
drop procedure if exists deletar_aluno_null;
drop procedure if exists deletar_coord_null;
drop procedure if exists deletar_curso_null;
drop procedure if exists deletar_ent_acad_null;
drop procedure if exists deletar_ativ_extra_null;

/* Deletando colunas */
drop procedure if exists deletar_horas_tabela;
drop procedure if exists deletar_curso_tabela; 
drop procedure if exists deletar_coord_tabela;
drop procedure if exists deletar_aux_curso_tabela;
/* FIM Drop de procedures */

/* FIM Procedures */
/* FIM SQL Banco de Dados. */