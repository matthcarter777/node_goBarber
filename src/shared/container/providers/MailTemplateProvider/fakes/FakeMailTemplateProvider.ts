import IMailTemplateProvider from '../models/IMailProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail template';
    }
}

export default FakeMailTemplateProvider;
