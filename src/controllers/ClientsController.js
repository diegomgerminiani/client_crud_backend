/**
 * @file  Controlador de todas as funções relacionadas à entidade "clients"
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */

const status = require("http-status");
const clients = require('../repositories/ClientsRepository');


/**
 * Adiciona uma nova instancia da entidade.
 * @access ADMIN
 * @param {object} request.body Objeto contendo os necessários para o novo cadastro.
 * @return Se adicionada, retorna a instancia com status CREATED. Caso contrario, retorna BAD_REQUEST.
 */
exports.createClient = async (request, response, next) => {
	try {
		const instancia = await clients.create(request.body);
		return (instancia ? response.status(status.CREATED).send(instancia) : response.status(status.BAD_REQUEST).send());

	} catch (error) { 
		next(error);  
	}
};

/**
 * Busca por todas as instancias da entidade
 * @access ADMIN
 * @return Se adicionada, retorna as instancias com status OK. Caso contrario, retorna NOT_FOUND.
 */
exports.getClients = async (request, response, next) => {
	try {

		const instancia = await clients.findAll();
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);  
	}
};

/**
 * Busca por uma instancia da entidade
 * @access ADMIN
 * @param {object} request.params.id ID do objeto que deve ser encontrado.
 * @return Se adicionada, retorna a instancia com status OK. Caso contrario, retorna NOT_FOUND.
 */
exports.getClient = async (request, response, next) => {
	try {
		const instancia = await clients.findOne(parseInt(request.params.id));
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);  
	}
};

/**
 * Atualiza uma instancia da entidade
 * @access ADMIN
 * @param {object} request.body Objeto contendo os novos dados, inclusive o ID da instancia.
 * @return Se atualizado, retorna a instancia com status ACCEPTED. Caso contrario, retorna NOT_ACCEPTABLE.
 */
exports.updateClient = async (request, response, next) => {
	try {
		const instancia = await clients.update(request.body);
		return (instancia ? response.status(status.ACCEPTED).send(instancia) : response.status(status.NOT_ACCEPTABLE).send());

	} catch (error) { 
		next(error);  
	}
};


/**
 * Exclui uma instancia da entidade
 * @access ADMIN
 * @param {number} request.params.id ID do objeto que deve ser removido.
 * @return Se removido, retorna OK.
 */
exports.deleteClient = async (request, response, next) => {
	try {
		await clients.delete(parseInt(request.params.id));
		return response.status(status.OK).send();

	} catch (error) { 
		next(error);  
	}
};
