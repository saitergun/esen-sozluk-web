import { ITdkMadde } from '../types/tdkMadde'
import BaseRepository from './base.repository'

export default class TdkMaddeRepository extends BaseRepository {
  async getSingle(maddeId: number) {
    const response = await this.client.tdkMadde.findUnique({
      where: { maddeId },
    })

    if (!response) {
      return null
    }

    const tdkMadde: ITdkMadde = {
      maddeId: response.maddeId,
      madde: response.madde,
      tdkData: response.tdkData as TdkMadde,
      createdAt: response.createdAt.toString(),
      updatedAt: response.updatedAt.toString(),
    }

    return tdkMadde
  }

  async getAnotherMeanings(madde: string, maddeId: number) {
    return await this.client.tdkMadde.findMany({
      select: {
        maddeId: true,
      },

      where: {
        madde: {
          equals: madde,
          mode: 'insensitive',
        },

        maddeId: {
          not: maddeId,
        },
      },
    })
  }
}
