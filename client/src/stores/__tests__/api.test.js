import {API_ROOT} from '../../config/routes'

describe('User API calls', () => {
    it('should return user info by login', async () => {
        const response = await fetch(`${API_ROOT}/user?login=qwerty`)
        const data = await response.json();
        expect(data).not.toBeUndefined()
        expect(data.login).toBe('qwerty')
    });

    it('should return list of resumes ID by owner', async () => {
        const owner = 'qwerty'
        const response = await fetch(`${API_ROOT}/resume/by/${owner}`)
        const data = await response.json();
        expect(data).toBeDefined()
    });
});