export abstract class BaseEvent<TPayload> extends Event {
	protected _payload: TPayload;
	get payload() {
		return this._payload;
	}
	constructor(type: string, payload: TPayload) {
		super(type);
		this._payload = payload;
	}
}
