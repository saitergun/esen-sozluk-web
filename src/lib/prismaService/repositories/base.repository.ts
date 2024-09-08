import Client from '../client'

export default abstract class BaseRepository {
  protected client: Client

  constructor() {
    this.client = new Client()
  }

  async knock() {
    await this.client.$queryRaw`SELECT 1`
  }
}
