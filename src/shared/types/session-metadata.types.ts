export interface LocationInfo {
	country: string
	city: string
	latidute: number
	longetude: number
}

export interface DeviceInfo {
	browser: string
	os: string
	type: string
}

export interface SessisonMetadata {
	location: LocationInfo
	device: DeviceInfo
	ip: string
}
