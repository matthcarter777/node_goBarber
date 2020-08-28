import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('shoult be able to create a new user', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'Mateus',
            email: 'mateus@gmail.com',
            password: 'sgdhagsdjkahsd',
        });

        expect(user).toHaveProperty('id');
    });

    it('shoult be able to create a new user with same email from another', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            name: 'Mateus',
            email: 'mateus@exemplo.com',
            password: 'sgdhagsdjkahsd',
        });

        expect(
            createUser.execute({
                name: 'Mateus',
                email: 'mateus@exemplo.com',
                password: 'sgdhagsdjkahsd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
