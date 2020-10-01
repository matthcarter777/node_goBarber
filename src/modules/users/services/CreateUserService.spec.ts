import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('shoult be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Mateus',
            email: 'mateus@gmail.com',
            password: 'sgdhagsdjkahsd',
        });

        expect(user).toHaveProperty('id');
    });

    it('shoult be able to create a new user with same email from another', async () => {
        await createUser.execute({
            name: 'Mateus',
            email: 'mateus@exemplo.com',
            password: 'sgdhagsdjkahsd',
        });

        await expect(
            createUser.execute({
                name: 'Mateus',
                email: 'mateus@exemplo.com',
                password: 'sgdhagsdjkahsd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
