import {
  isAdmin,
  filterByCompany,
} from '../libs/utils';
import CompanyModel from '../database/CompanyModel';
import { desc } from '../libs/utils';

export async function getOrgs ({ company_token: org }) {
  if (!filterByCompany) {
    return [
      {
        id: 1,
        company_token: 'bogus',
      },
    ];
  }
  const whereConditions = isAdmin(org) ? {} : { company_token: org };
  const result = await CompanyModel.findAll({
    where: whereConditions,
    attributes: ['id', 'company_token'],
    order: [['updated_at', desc]],
    raw: true,

  });
  return result;
}

export async function findOrCreate ({ company_token: org }) {
  const now = new Date();
  const [company] = await CompanyModel.findOrCreate({
    where: { company_token: org },
    defaults: { created_at: now, company_token: org, updated_at: now },
    raw: true,
  });
  return company;
};
