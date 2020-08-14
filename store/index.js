import { LocalStorageHandler } from 'keylocal/dist/storage/localStorage';
import { PasswordHandler } from 'keylocal/dist/strategy/pgp/password';
import { getField, updateField } from 'vuex-map-fields';

/**
 * Local storage key for the secrets.
 * @const
 */
export const PHOTION_LOCAL_STORAGE_SECRETS_KEY = 'PHOTION_LOCAL_STORAGE_SECRETS_KEY';

/**
 * Local storage secrets handler.
 * @const
 */
const lsh = new LocalStorageHandler(
    PHOTION_LOCAL_STORAGE_SECRETS_KEY,
    {
        strategy: new PasswordHandler(),
        localStorage: window.localStorage,
    },
);


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
        const serialized = await lsh.serialize({ password }, state.secrets);
        return serialized;
    },

    /**
     * Imports the secrets from the local storage.
     * @param {object} param0
     * @param {Function} param0.commit
     * @param {string} password
     */
    'secrets/from-local': async ({ commit }, password) => {
        const deserialized = await lsh.load({ password });
        commit('secrets/load', deserialized);
    },

    /**
     * Exports the secrets to the local storage.
     * @param {object} param0
     * @param {object} param0.state
     * @param {string} password
     */
    'secrets/to-local': async ({ dispatch, state }, password) => {
        await lsh.save({ password }, state.secrets);
    },

};


export const strict = false;
