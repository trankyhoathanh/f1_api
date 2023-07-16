export class DriverResult {
  constructor(data?: Partial<DriverResult>) {
    Object.assign(this, data)
  }
  driverId: string
  url: string
  givenName: string
  familyName: string
  dateOfBirth: string
  nationality: string
  permanentNumber?: string
  code?: string
}
