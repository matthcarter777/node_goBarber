// import AppError from '@shared/errors/AppError';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        resetPassword = new ResetPasswordService(
            fakeUserRepository,
            fakeUserTokensRepository,
        );
    });

    it('shoult be able to reset the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '123123',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPassword.execute({
            password: '123456',
            token,
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123456');
    });
});
