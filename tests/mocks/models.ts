
export const projects = {
  valid: [
    {
      uuid: '994b6e4d-90f4-4ef5-90f1-9accc6994297',
      name: 'Project 1',
      description: 'Some project...',
    },
    {
      uuid: 'e59530aa-2ddd-45a4-af43-474edc71b589',
      name: 'Project 2',
      description: 'Another project...',
    },
  ],
};

export const concepts = {
  valid: [
    {
      uuid: 'c047d8ba-a513-41fb-ba99-b80459a9c86z',
      name: 'Concept 1',
      description: 'Some concept description...',
      projects: ['994b6e4d-90f4-4ef5-90f1-9accc6994297', 'e59530aa-2ddd-45a4-af43-474edc71b589'],
      tags: ['Some Tag'],
      type: 'IMAGE',
      date: '2020-08-17',
      public: true,
      featured: false,
    },
  ],
};

export const medias = {
  valid: [
    {
      uuid: '2c19228d-125e-4499-ab5e-76a97364c1bf',
      concept: 'c047d8ba-a513-41fb-ba99-b80459a9c86z',
      role: 'PREVIEW',
      storage: 'FREQUENT_ACCESS',
      data: 'https://images.squarespace-cdn.com/content/v1/5f155efa59262a257d82fef7/1597776819014-H9MAISLCT0N4QG4FZCU3/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UYapt4KGntwbjD1IFBRUBU6SRwXJogFYPCjZ6mtBiWtU3WUfc_ZsVm9Mi1E6FasEnQ/Pink+wild+flowers+against+the+blue+sky.png?format=1000w',
    },
  ],
};
