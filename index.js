const infoUser = require("readline-sync");

let pacientesCadastrados = [];
let agendamentos = [];

function cadastrarPaciente() {
  console.log("\n### Cadastro de Paciente ###");

  const nome = infoUser.question("Digite o nome do paciente: ");
  const telefone = infoUser.question("Digite o telefone do paciente: ");

  let pacienteExistente = pacientesCadastrados.some(
    (paciente) => paciente.telefone === telefone
  );

  if (pacienteExistente) {
    console.log("Paciente já cadastrado!");
  } else {
    const novoPaciente = { nome, telefone };
    pacientesCadastrados.push(novoPaciente);
    console.log("Paciente cadastrado com sucesso!");
  }
}

function marcarConsulta() {
  console.log("\n### Marcação de Consulta ###");

  console.log("Pacientes Cadastrados:");
  for (let i = 0; i < pacientesCadastrados.length; i++) {
    console.log(`${i + 1}. ${pacientesCadastrados[i].nome}`);
  }

  const escolhaPaciente =
    infoUser.questionInt("Escolha o número correspondente ao paciente: ") - 1;

  if (escolhaPaciente < 0 || escolhaPaciente >= pacientesCadastrados.length) {
    console.log("Opção inválida.");
    return;
  }

  const pacienteSelecionado = pacientesCadastrados[escolhaPaciente];

  const data = infoUser.question("Digite a data da consulta (DD-MM-AAAA): ");
  const hora = infoUser.question("Digite a hora da consulta: ");
  const especialidade = infoUser.question("Digite a especialidade desejada: ");

  const [dia, mes, ano] = data.split("-");
  const dataFormatada = new Date(ano, mes - 1, dia);

  if (isNaN(dataFormatada.getTime()) || dataFormatada < new Date()) {
    console.log("Data inválida ou retroativa.");
    return;
  }

  let consultaExistente = agendamentos.some(
    (consulta) =>
      consulta.data.getTime() === dataFormatada.getTime() &&
      consulta.hora === hora
  );

  if (consultaExistente) {
    console.log("Horário indisponível. Escolha outra data ou hora.");
    return;
  }

  const novaConsulta = {
    paciente: pacienteSelecionado,
    data: dataFormatada,
    hora,
    especialidade,
  };

  agendamentos.push(novaConsulta);
  console.log("Consulta agendada com sucesso!");
}

function cancelarConsulta() {
  console.log("\n### Cancelamento de Consulta ###");

  console.log("Consultas Agendadas:");
  for (let i = 0; i < agendamentos.length; i++) {
    console.log(
      `${i + 1}. ${agendamentos[i].paciente.nome} - ${agendamentos[
        i
      ].data.toLocaleDateString()} ${agendamentos[i].hora} - ${
        agendamentos[i].especialidade
      }`
    );
  }

  const escolhaConsulta =
    infoUser.questionInt("Escolha o número correspondente à consulta: ") - 1;

  if (escolhaConsulta < 0 || escolhaConsulta >= agendamentos.length) {
    console.log("Opção inválida.");
    return;
  }

  const consultaCancelada = agendamentos.splice(escolhaConsulta, 1)[0];
  console.log(
    `Consulta cancelada: ${
      consultaCancelada.paciente.nome
    } - ${consultaCancelada.data.toLocaleDateString()} ${
      consultaCancelada.hora
    } - ${consultaCancelada.especialidade}`
  );
}

function menuPrincipal() {
  while (true) {
    console.log("\n### Menu Principal ###");
    console.log("1. Cadastrar Paciente");
    console.log("2. Marcar Consulta");
    console.log("3. Cancelar Consulta");
    console.log("4. Sair");

    const escolha = infoUser.questionInt("Escolha uma opção: ");

    if (escolha === 1) {
      cadastrarPaciente();
    } else if (escolha === 2) {
      marcarConsulta();
    } else if (escolha === 3) {
      cancelarConsulta();
    } else if (escolha === 4) {
      console.log("Saindo do sistema.");
      return;
    } else {
      console.log("Opção inválida. Tente novamente.");
    }
  }
}

menuPrincipal();
