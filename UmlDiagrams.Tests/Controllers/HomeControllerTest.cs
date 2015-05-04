using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UmlDiagrams.WebApp;
using UmlDiagrams.WebApp.Controllers;
using UmlDiagrams.Domain.Model;
using UmlDiagrams.Domain;
using Moq;
using UmlDiagrams.WebApp.Models;

namespace UmlDiagrams.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void TestList()
        {
            var mock = new Mock<IDiagramsRepository>();
            mock.Setup(m => m.GetAllDiagrams()).Returns(
                new UmlDiagram[]
                {
                    new UmlDiagram() { Name = "test1"},
                    new UmlDiagram() { Name = "test2"}
                }.AsQueryable()
            );
            var controller = new HomeController(mock.Object);
            ViewResult result = controller.Index() as ViewResult;

            Assert.IsNotNull(result);
            IEnumerable<UmlDiagram> model = result.Model as IEnumerable<UmlDiagram>;
            Assert.IsNotNull(model);
            Assert.AreEqual(model.Count(), 2);
        }

        [TestMethod]
        public void CanCreateDiagram()
        {
            var mock = new Mock<IDiagramsRepository>();
            mock.Setup(m => m.CreateNew(null, null)).Returns(1);
            var controller = new HomeController(mock.Object);
            CreateResponseCookiesMock(controller);

            RedirectToRouteResult result = controller.Create(null, null);

            Assert.AreEqual(result.RouteValues["controller"], "Home");
            Assert.AreEqual(result.RouteValues["action"], "Diagram");
            Assert.AreEqual(result.RouteValues["id"], 1);
            Assert.IsNull(controller.TempData[HomeController.DIAGRAM_NOT_CREATED_KEY]);
        }

        [TestMethod]
        public void CanRememberAuthor()
        {
            var repository = new Mock<IDiagramsRepository>();
            repository.Setup(m => m.CreateNew("", "test_author")).Returns(1);
            var controller = new HomeController(repository.Object);
            CreateResponseCookiesMock(controller);

            var result = controller.Create("", "test_author");

            Assert.IsInstanceOfType(result, typeof(RedirectToRouteResult));
            Assert.AreEqual(controller.Response.Cookies[HomeController.AUTHOR_COOKIE].Value, "test_author");
        }

        [TestMethod]
        public void CanGenerateErrorMessage()
        {
            var mock = new Mock<IDiagramsRepository>();
            mock.Setup(m => m.CreateNew(null, null)).Returns((int?)null);
            var controller = new HomeController(mock.Object);

            var result = controller.Create(null, null) as RedirectToRouteResult;

            Assert.IsNotNull(result);
            Assert.IsNotNull(controller.TempData[HomeController.DIAGRAM_NOT_CREATED_KEY]);
            Assert.AreEqual(result.RouteValues["controller"], "Home");
            Assert.AreEqual(result.RouteValues["action"], "Index");
        }

        [TestMethod]
        public void TestDiagram()
        {
            var mock = new Mock<IDiagramsRepository>();
            mock.Setup(m => m.GetDiagram(0)).Returns(new UmlDiagram());
            var controller = new HomeController(mock.Object);

            var model = controller.Diagram(0).Model as DiagramDrawingModel;

            Assert.IsNotNull(model);
            Assert.IsNotNull(model.Diagram);
            Assert.IsTrue(model.ToolboxElements.Any());
        }

        private void CreateResponseCookiesMock(HomeController controller)
        {
            var response = new Mock<HttpResponseBase>();
            var coockies = new HttpCookieCollection();
            response.Setup(m => m.Cookies).Returns(coockies);
            response.Setup(m => m.SetCookie(It.IsAny<HttpCookie>()))
                .Callback<HttpCookie>(item => coockies.Add(item)); ;
            var mockHttpContext = new Mock<HttpContextBase>();
            mockHttpContext.Expect(c => c.Response).Returns(response.Object);
            controller.ControllerContext = new ControllerContext(
                mockHttpContext.Object, new RouteData(), new Mock<ControllerBase>().Object);
        }
    }
}
