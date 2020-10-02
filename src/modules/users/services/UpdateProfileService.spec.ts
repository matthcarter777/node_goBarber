import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('shoult be able to update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '12345',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Trê',
            email: 'jhontre@exemple.com',
        });

        expect(updatedUser.name).toBe('Jhon Trê');
        expect(updatedUser.email).toBe('jhontre@exemple.com');
    });

    it('shoult not be able to update the profile from non-existing user', async () => {
        expect(
            updateProfile.execute({
                user_id: 'non-existing-user-id',
                name: 'Jhon Doe',
                email: 'jhondoe@exemple.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoult be able to change to anather user email', async () => {
        await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '12345',
        });

        const user = await fakeUserRepository.create({
            name: 'Test',
            email: 'test@exemplo.com',
            password: '12345',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Test',
                email: 'jhondoe@exemplo.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoult be able to update the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '12345',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Trê',
            email: 'jhontre@exemple.com',
            old_password: '12345',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('shoult nto be able to update the password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '12345',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Jhon Trê',
                email: 'jhontre@exemple.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoult nto be able to update the password with  wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '12345',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Jhon Trê',
                email: 'jhontre@exemple.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
