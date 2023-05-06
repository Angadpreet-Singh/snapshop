import { createClient } from '@sanity/client'

const config = {
    projectId: 'v3rs2f79',
    dataset: 'production',
    token:"skv4E6BX2CuoA4uJElSybdgkDrYecw3CR8DIe2sDGlu7qdaKdsgiuGDVHQ7uqZOM4p4Z2HoYCW07vCKgLboJltNucxnM75Cm6EyfQ5MHGBqnFvbKbVjImZd3z2rexDFWxIiLPuNBrbc5u2CHJTMM5wpav2wb6mnF6b1v4oHOaTqi2JpUXHiZ",
    useCdn: true,
    apiVersion: '2022-01-12',
}

export const client = createClient(config)
