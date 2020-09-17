import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakemailProvide: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakemailProvide = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakemailProvide,
            fakeUserTokensRepository,
        );
    });

    it('shoult be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakemailProvide, 'sendMail');

        await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '123123',
        });

        await sendForgotPasswordEmail.execute({
            email: 'jhondoe@exemplo.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'jhondoe@exemplo.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generete a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '123123',
        });

        await sendForgotPasswordEmail.execute({
            email: 'jhondoe@exemplo.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
