import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatar from './UpdateUserAvatarService';

describe('UpdateAvatar', () => {
    it('shoult be able to update', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatar(
            fakeUserRepository,
            fakeStorageProvider,
        );

        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '12345',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'teste.pdf',
        });

        expect(user).toHaveProperty('id');
    });

    it('shoult not be able to update avatar from non existing user', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatar(
            fakeUserRepository,
            fakeStorageProvider,
        );

        expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFileName: 'teste.pdf',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoult delete old avatar when updating new one', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatar(
            fakeUserRepository,
            fakeStorageProvider,
        );

        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '12345',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'teste.pdf',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'teste2.pdf',
        });

        expect(deleteFile).toHaveBeenCalledWith('teste.pdf');
        expect(user.avatar).toBe('teste2.pdf');
    });
});
