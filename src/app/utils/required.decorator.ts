// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, @typescript-eslint/naming-convention
export function Required(target: any, property: string | symbol): void {
	const { constructor } = target;

	constructor.__requiredProps = [...(constructor.__requiredProps || []), property];

	if (constructor.__ngOnInitRequiredPropsPatched) {
		return;
	}

	const originalOnInit = target.ngOnInit;

	// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
	target.ngOnInit = function ngOnInit(): void {
		for (const key of constructor.__requiredProps) {
			if (this[key] === undefined) {
				throw new Error(`${key} @Input() binding of ${target.constructor.name} is required`);
			}
		}

		if (originalOnInit) {
			originalOnInit.call(this);
		}
	};

	constructor.__ngOnInitRequiredPropsPatched = true;
}
