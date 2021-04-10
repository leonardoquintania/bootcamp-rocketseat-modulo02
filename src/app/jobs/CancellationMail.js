import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
	get key() {
		return 'CancellationMail';
	}

	//-- Tarefa que é chamada
	async handle({ data }) {
		const { appointment } = data;

		console.log('Executou a fila');

		await Mail.seendMail({
			to: `${appointment.provider.name} <${appointment.provider.email}>`,
			subject: 'Agendamento Cancelado',
			template: 'cancellation',
			context: {
				provider: appointment.provider.name,
				user: appointment.user.name,
				date: format(
					parseISO(appointment.date),
					"'dia' dd 'de' MMMM', às' H:mm'h'",
					{
						locale: pt,
					}
				),
			},
		});
	}
}

export default new CancellationMail();
