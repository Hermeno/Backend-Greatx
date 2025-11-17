-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL,
    "endereco" TEXT,
    "tipo_cliente" TEXT,
    "nivel_acesso" TEXT DEFAULT 'admin_master',

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuarios_internos" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL,
    "funcao" TEXT,

    CONSTRAINT "usuarios_internos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estabelecimentos" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "tipo" TEXT,

    CONSTRAINT "estabelecimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mesas" (
    "id" SERIAL NOT NULL,
    "estabelecimento_id" INTEGER,
    "numero" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disponivel',

    CONSTRAINT "mesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuarios_finais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "senha" TEXT,
    "foto" TEXT,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_acesso" TEXT DEFAULT 'app',

    CONSTRAINT "usuarios_finais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produtos" (
    "id" SERIAL NOT NULL,
    "estabelecimento_id" INTEGER,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(65,30) NOT NULL,
    "foto" TEXT,
    "categoria_id" INTEGER,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedidos" (
    "id" SERIAL NOT NULL,
    "usuario_final_id" INTEGER,
    "mesa_id" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'aberto',
    "total" DECIMAL(65,30),
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."itens_pedido" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER,
    "produto_id" INTEGER,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "itens_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."historico_beneficios" (
    "id" SERIAL NOT NULL,
    "usuario_final_id" INTEGER,
    "beneficio" TEXT,
    "data_uso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historico_beneficios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pagamentos" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER,
    "metodo_pagamento" TEXT,
    "valor" DECIMAL(65,30),
    "data_pagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."acessos_qrcode" (
    "id" SERIAL NOT NULL,
    "mesa_id" INTEGER,
    "usuario_final_id" INTEGER,
    "data_acesso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_acesso" TEXT DEFAULT 'web_qr',

    CONSTRAINT "acessos_qrcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."log_admin" (
    "id" SERIAL NOT NULL,
    "usuario_interno_id" INTEGER,
    "acao" TEXT,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."historico_relatorios" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER,
    "tipo_relatorio" TEXT,
    "parametros" TEXT,
    "data_execucao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historico_relatorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."monitoramento_sistema" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER,
    "tipo_evento" TEXT,
    "detalhe" TEXT,
    "data_evento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitoramento_sistema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "public"."clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_internos_email_key" ON "public"."usuarios_internos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_finais_email_key" ON "public"."usuarios_finais"("email");

-- AddForeignKey
ALTER TABLE "public"."usuarios_internos" ADD CONSTRAINT "usuarios_internos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."estabelecimentos" ADD CONSTRAINT "estabelecimentos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mesas" ADD CONSTRAINT "mesas_estabelecimento_id_fkey" FOREIGN KEY ("estabelecimento_id") REFERENCES "public"."estabelecimentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produtos" ADD CONSTRAINT "produtos_estabelecimento_id_fkey" FOREIGN KEY ("estabelecimento_id") REFERENCES "public"."estabelecimentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produtos" ADD CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedidos" ADD CONSTRAINT "pedidos_usuario_final_id_fkey" FOREIGN KEY ("usuario_final_id") REFERENCES "public"."usuarios_finais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedidos" ADD CONSTRAINT "pedidos_mesa_id_fkey" FOREIGN KEY ("mesa_id") REFERENCES "public"."mesas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_pedido" ADD CONSTRAINT "itens_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_pedido" ADD CONSTRAINT "itens_pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "public"."produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."historico_beneficios" ADD CONSTRAINT "historico_beneficios_usuario_final_id_fkey" FOREIGN KEY ("usuario_final_id") REFERENCES "public"."usuarios_finais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pagamentos" ADD CONSTRAINT "pagamentos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."acessos_qrcode" ADD CONSTRAINT "acessos_qrcode_mesa_id_fkey" FOREIGN KEY ("mesa_id") REFERENCES "public"."mesas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."acessos_qrcode" ADD CONSTRAINT "acessos_qrcode_usuario_final_id_fkey" FOREIGN KEY ("usuario_final_id") REFERENCES "public"."usuarios_finais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."log_admin" ADD CONSTRAINT "log_admin_usuario_interno_id_fkey" FOREIGN KEY ("usuario_interno_id") REFERENCES "public"."usuarios_internos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."historico_relatorios" ADD CONSTRAINT "historico_relatorios_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."monitoramento_sistema" ADD CONSTRAINT "monitoramento_sistema_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
