/**
 * @file  Camada de persistencia da entidade "clients"
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */

const status = require("http-status");
const { driver } = require('../config/neo4j_connection')

/**
 * Adiciona uma nova instancia da entidade.
 * @access ADMIN
 * @param {object} body Objeto contendo os necessários para o novo cadastro.
 * @return Se adicionada, retorna a instancia. Caso contrario, retorna null.
 */
exports.create = async (body) => {
	const session = driver.session()
	try {
		//Dispara a criação da nova instancia
		const result = await session.run(
			`CREATE (c:Client {name: $name, cpf: $cpf, phone: $phone, address: $address}) RETURN c`,
			body
		)
		//Caso nada retorne, responde com erro
		if(!result.records[0]) return null

		//Caso o cadastro seja bem sucedido, prepara os dados para a resposta
		result.records[0].get(0).properties.id = result.records[0].get(0).identity.low;
		return result.records[0].get(0).properties
	} catch (error) { 
		throw error; 
	} finally {
		await session.close()
	}
};

/**
 * Busca por todas as instancias da entidade
 * @access ADMIN
 * @return Se encontrado, retorna as instancias. Caso contrario, retorna null.
 */
exports.findAll = async () => {
	const session = driver.session()
	try {
		//Dispara a busca por todos as instancias
		const result = await session.run(`MATCH (c:Client) RETURN c.name`)

		//Prepara os dados para a resposta
		const response = result.records.map((node) => {
			node.get(0).properties.id = node.get(0).identity.low
			return node.get(0).properties
		})
		return response.length > 0 ? response : null
	} catch (error) { 
		throw error; 
	} finally {
		await session.close()
	}
};

/**
 * Busca por uma instancia da entidade
 * @access ADMIN
 * @param {object} id ID do objeto que deve ser encontrado.
 * @return Se encontrado, retorna a instancia. Caso contrario, retorna null.
 */
exports.findOne = async (id) => {
	const session = driver.session()
	try {
		//Dispara a busca pela instancia do ID requisitado
		const result = await session.run(`MATCH (c:Client) WHERE id(c) = $id RETURN c`, { id })

		//Caso não encontre, responde com erro
		if(!result.records[0]) return null

		//Caso encontre, prepara os dados para resposta
		result.records[0].get(0).properties.id = result.records[0].get(0).identity.low;
		return result.records[0].get(0).properties
	} catch (error) { 
		throw error; 
	} finally {
		await session.close()
	}
};

/**
 * Atualiza uma instancia da entidade
 * @access ADMIN
 * @param {object} body Objeto contendo os novos dados, inclusive o ID da instancia.
 * @return Se atualizado, retorna a instancia. Caso contrario, retorna null.
 */
exports.update = async (body) => {
	const session = driver.session()
	try {
		//Dispara a edição da instancia desejada
		const result = await session.run(`
			MATCH (c:Client) 
			WHERE id(c) = $id 
			SET c.name=$name, c.cpf=$cpf, c.phone=$phone, c.address=$address
			RETURN c`, body)

		//Caso não retorne resposta, responde com erro
		if(!result.records[0]) return null

		//Caso retorne, prepara os dados para resposta
		result.records[0].get(0).properties.id = result.records[0].get(0).identity.low;
		return result.records[0].get(0).properties
	} catch (error) { 
		throw error; 
	} finally {
		await session.close()
	}
};

/**
 * Exclui uma instancia da entidade
 * @access ADMIN
 * @param {number} id ID do objeto que deve ser removido.
 * @return retorna null.
 */
exports.delete = async (id) => {
	const session = driver.session()
	try {
		//Dispara a remoção da instancia desejada
		const result = await session.run(`
			MATCH (c:Client) 
			WHERE id(c) = $id
			DELETE c`, {id})
		return null
	} catch (error) { 
		throw error; 
	} finally {
		await session.close()
	}
};

