using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using UmlDiagrams.WebApp;

namespace UmlDiagrams.Tests
{
    [TestClass]
    public class RoutesTest
    {
        private HttpContextBase CreateHttpContext(string targetUrl = null, string httpMethod = "GET")
        {
            // создать mock-запрос
            Mock<HttpRequestBase> mockRequest = new Mock<HttpRequestBase>();
            mockRequest.Setup(m => m.AppRelativeCurrentExecutionFilePath)
              .Returns(targetUrl);
            mockRequest.Setup(m => m.HttpMethod).Returns(httpMethod);

            // создать mock-response
            Mock<HttpResponseBase> mockResponse = new Mock<HttpResponseBase>();
            mockResponse.Setup(m => m.ApplyAppPathModifier(It.IsAny<string>()))
              .Returns<string>(s => s);

            // создать mock-контекст, используя запрос и ответ
            Mock<HttpContextBase> mockContext = new Mock<HttpContextBase>();
            mockContext.Setup(m => m.Request).Returns(mockRequest.Object);
            mockContext.Setup(m => m.Response).Returns(mockResponse.Object);
            return mockContext.Object;
        }

        [TestMethod]
        public void TestDiagramItemRoute()
        {
            RouteCollection routes = new RouteCollection();
            RouteConfig.RegisterRoutes(routes);
            var context = new RequestContext(CreateHttpContext(), new RouteData());
            var dictionary = new RouteValueDictionary();
            dictionary["id"] = 1;
            string result = UrlHelper.GenerateUrl(null, "Diagram", "Home", dictionary,
                routes, context, true);
            Assert.AreEqual("/Home/Diagram/1", result);
        }
    }
}
