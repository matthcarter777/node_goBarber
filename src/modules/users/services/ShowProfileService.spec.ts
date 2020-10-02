import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();

        showProfileService = new ShowProfileService(fakeUserRepository);
    });

    it('shoult be able to show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@exemplo.com',
            password: '12345',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('Jhon Trê');
        expect(profile.email).toBe('jhontre@exemple.com');
    });

    it('shoult not be able to show the profile from non-existing user', async () => {
        expect(
            showProfileService.execute({
                user_id: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
