'use strict';

const client = require('./client');

class MessageClient {
  constructor() {}

  /**
   * Get Message by ID
   * @param {number} id - Message ID.
   * @returns {Promise} Promise object represents Message.
   */
  async getMessage(id) {
    return new Promise((resolve, reject) => {
      client.getMessage({ id }, (error, message) => {
        if (error) return reject(error);
        resolve(message);
      });
    });
  }

  /**
   * Get all Messages
   * @returns {Promise} Promise object represents all Messages.
   */
  async getAllMessages() {
    return new Promise((resolve, reject) => {
      client.getAllMessages({}, (error, messages) => {
        if (error) return reject(error);
        resolve(messages);
      });
    });
  }

  /**
   * Get all User Messages
   * @param {number} id - User ID.
   * @returns {Promise} Promise object represents all User Messages.
   */
  async getUserMessages(id) {
    return new Promise((resolve, reject) => {
      client.getUserMessages({ id }, (error, messages) => {
        if (error) return reject(error);
        resolve(messages);
      });
    });
  }

  /**
   * Create a new Message
   * @param {string} text - Message text.
   * @param {number} userId - User ID.
   * @returns {Promise} Promise object represents Message ID.
   */
  async addMessage(text, userId) {
    return new Promise((resolve, reject) => {
      client.addMessage({ text, userId }, (error, message) => {
        if (error) return reject(error);
        resolve(message.id);
      });
    });
  }

  /**
   * Update Message
   * @param {number} id - Message ID.
   * @param {string} text - Message text.
   * @returns {Promise} Promise object represents Message.
   */
  async updateMessage(id, text) {
    return new Promise((resolve, reject) => {
      client.editMessage({ id, text }, (error, message) => {
        if (error) return reject(error);
        resolve(message);
      });
    });
  }

  /**
   * Delete Message
   * @param {number} id - Message ID.
   * @returns {Promise} Promise object represents empty Object.
   */
  async deleteMessage(id) {
    return new Promise((resolve, reject) => {
      client.deleteMessage({ id }, (error, object) => {
        if (error) return reject(error);
        resolve(object);
      });
    });
  }
}

module.exports = MessageClient;
