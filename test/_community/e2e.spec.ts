import type { Page } from '@playwright/test'

import { expect, test } from '@playwright/test'

import { initPageConsoleErrorCatch } from '../helpers'
import { AdminUrlUtil } from '../helpers/adminUrlUtil'
import { initPayloadE2E } from '../helpers/configHelpers'

const { beforeAll, describe } = test

describe('Admin Panel', () => {
  let page: Page
  let url: AdminUrlUtil

  beforeAll(async ({ browser }) => {
    const { serverURL } = await initPayloadE2E(__dirname)
    url = new AdminUrlUtil(serverURL, 'posts')

    const context = await browser.newContext()
    page = await context.newPage()
    initPageConsoleErrorCatch(page)
  })

  test('version exists', async () => {
    await page.goto(url.edit('1'))
    const versionsTab = page.locator('.doc-tabs__tabs li:nth-child(2)')
    await versionsTab.click()
    await expect(page.locator('.row-1')).toBeAttached()
  })

  test('version exists after save', async () => {
    await page.goto(url.edit('1'))
    const saveButton = page.locator('#action-save')
    await saveButton.click()
    const verionsTab = page.locator('.doc-tabs__tabs li:nth-child(2)')
    await verionsTab.click()
    await expect(page.locator('.row-1')).toBeAttached()
    await expect(page.locator('.row-2')).toBeAttached()
  })
})
