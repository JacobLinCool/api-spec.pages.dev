import { expect, test } from "@playwright/test";

test("can load yaml spec for RapiDoc", async ({ page }) => {
	await page.goto(
		"/rapidoc?url=https://raw.githubusercontent.com/OpenAPITools/openapi-generator/master/modules/openapi-generator/src/test/resources/2_0/petstore.yaml",
	);
	await expect(page.title()).resolves.toMatch("OpenAPI Petstore");
	await expect(page.locator("meta[name=description]").first()).toHaveAttribute(
		"content",
		"This is a sample server Petstore server. For this sample, you can use the api key `special-key` to test the authorization filters.",
	);
});

test("can load json spec for RapiDoc", async ({ page }) => {
	await page.goto("/rapidoc?url=https://generator3.swagger.io/openapi.json");
	await expect(page.title()).resolves.toMatch("Swagger Generator");
	await expect(page.locator("meta[name=description]").first()).toHaveAttribute(
		"content",
		"This is an online swagger codegen server.  You can find out more at https://github.com/swagger-api/swagger-codegen or on [irc.freenode.net, #swagger](http://swagger.io/irc/).",
	);
});
