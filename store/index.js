import { getField, updateField } from 'vuex-map-fields';

import { decryptString, encryptString } from '@/app/pgp';

/**
 * Local storage key for the secrets.
 * @const
 */
export const PHOTION_LOCAL_STORAGE_SECRETS_KEY = 'PHOTION_LOCAL_STORAGE_SECRETS_KEY';

/**
 * Generates the state for the application.
 * @returns {object}
 */
export const state = () => ({
    media: {
        projects: {},
    },
    site: {
        domain: '',
        title: '',
        description: '',
    },
    secrets: {
        googleCloud: {
            public: '',
            private: '',
        },
    },
    user: {
        name: '',
        email: '',
        bio: '',
    },
});

export const getters = {
    getField,
};

/**
 * Mutations for Photion Admin.
 * @const
 */
export const mutations = {

    /**
     * Loads the secrets in the state.
     * @param {object} state
     * @param {object} secrets
     */
    'secrets/load': (state, secrets) => {
        Object.entries(secrets).forEach(([key, value]) => {
            state.secrets[key] = value;
        });
    },

    updateField,
};

/**
 * Actions for Photion Admin.
 * @const
 */
export const actions = {

    'secrets/encrypt': async ({ state }, password) => {
        const secrets = JSON.stringify(state.secrets);
        const encrypted = await encryptString(secrets, password);

        return encrypted;
    },

    /**
     * Imports the secrets from the local storage.
     * @param {object} param0
     * @param {Function} param0.commit
     * @param {string} password
     */
    'secrets/from-local': async ({ commit }, password) => {
        const encrypted = window.localStorage.getItem(PHOTION_LOCAL_STORAGE_SECRETS_KEY);
        const decrypted = await decryptString(encrypted, password);
        const secrets = JSON.parse(decrypted);

        commit('secrets/load', secrets);
    },

    /**
     * Exports the secrets to the local storage.
     * @param {object} param0
     * @param {object} param0.state
     * @param {string} password
     */
    'secrets/to-local': async ({ dispatch }, password) => {
        const encrypted = await dispatch('secrets/encrypt', password);
        window.localStorage.setItem(PHOTION_LOCAL_STORAGE_SECRETS_KEY, encrypted);
    },

};


export const strict = false;
