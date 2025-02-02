interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ) { };

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) throw new Error(`Error on service ${url}`);
            this.successCallback();
            return true;
        } catch (error) {
            console.log(error);
            this.errorCallback(`Error ${error}`);
            return false;
        }
    }
}