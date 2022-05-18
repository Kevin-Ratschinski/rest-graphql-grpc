'use strict';

const client = require('./client');

class UserClient {
  constructor() {}

  /**
   * Get User by ID
   * @param {number} id - User ID.
   * @returns {Promise} Promise object represents User.
   */
  async getUser(id) {
    return new Promise((resolve, reject) => {
      client.getUser({ id }, (error, user) => {
        if (error) return reject(error);
        resolve(user);
      });
    });
  }

  /**
   * Get all Users
   * @returns {Promise} Promise object represents all Users.
   */
  async getAllUsers() {
    return new Promise((resolve, reject) => {
      client.getAllUsers({}, (error, users) => {
        if (error) return reject(error);
        resolve(users);
      });
    });
  }

  /**
   * Create a new User
   * @param {string} first_name - User first name.
   * @param {string} last_name - User last name.
   * @param {string} email - User email.
   * @returns {Promise} Promise object represents User ID.
   */
  async addUser(first_name, last_name, email) {
    return new Promise((resolve, reject) => {
      client.addUser(
        {
          first_name,
          last_name,
          email,
        },
        (error, user) => {
          if (error) return reject(error);
          resolve(user.id);
        }
      );
    });
  }

  /**
   * Update User
   * @param {number} id - User ID.
   * @param {string} first_name - User first name.
   * @param {string} last_name - User last name.
   * @param {string} email - User email.
   * @returns {Promise} Promise object represents User.
   */
  async updateUser(id, first_name, last_name, email) {
    return new Promise((resolve, reject) => {
      client.editUser(
        {
          id,
          first_name,
          last_name,
          email,
        },
        (error, user) => {
          if (error) return reject(error);
          resolve(user);
        }
      );
    });
  }

  /**
   * Delete User
   * @param {number} id - User ID.
   * @returns {Promise} Promise object represents empty Object.
   */
  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      client.deleteUser({ id }, (error, object) => {
        if (error) return reject(error);
        resolve(object);
      });
    });
  }
}

module.exports = UserClient;
