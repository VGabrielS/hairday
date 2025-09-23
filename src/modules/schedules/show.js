import dayjs from "dayjs";

// Seleciona as sessões manhã, tarde e noite.
const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodnight = document.getElementById("period-night");   

export function scheduleShow({ dailySchedules}) {
    try {
        // Limpa a listas de agendamentos.
        periodMorning.innerHTML = "";
        periodAfternoon.innerHTML = "";
        periodnight.innerHTML = "";

        // Redenriza os agendamentos por período.
        dailySchedules.forEach((schedule) => {
            const item = document.createElement("li");
            const time = document.createElement("strong");
            const name = document.createElement("span");

            // Adiciona o Id do Agendamento.
            item.setAttribute("data-id", schedule.id);

            time.textContent = dayjs(schedule.when).format("HH:mm");
            name.textContent = schedule.name

            // Cria ícone de cancelar o agendamento.
            const cancelIcon = document.createElement("img")
            cancelIcon.classList.add("cancel-icon")
            cancelIcon.setAttribute("src", "src/assets/cancel.svg")
            cancelIcon.setAttribute("alt", "Cancelar agendamento")

            //Adiciona o tempo, nome e ícone no item.
            item.append(time,name, cancelIcon);

            // Obtém somente a hora.
            const hour = dayjs(schedule.when).hour()

            // Redenriza o agendamento na sessão (manhã, tarde ou noite).
            if (hour <= 12) {
                periodMorning.appendChild(item);      
            } else if (hour > 12 && hour <=18){
                periodAfternoon.appendChild(item)
            } else {
                periodnight.appendChild(item)
            }

        });

    } catch (error) {
        alert("Não foi possível exibir os agendamentos.");
        console.log(error);
    }
}