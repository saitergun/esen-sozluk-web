import { TdkMaddeRepository } from './repositories'

class PrismaService {
  tdkMadde: TdkMaddeRepository

  constructor() {
    this.tdkMadde = new TdkMaddeRepository()
  }
}

const prismaService = new PrismaService()

export default prismaService
