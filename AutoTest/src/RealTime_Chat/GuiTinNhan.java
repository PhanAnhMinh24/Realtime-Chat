package RealTime_Chat;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class GuiTinNhan {
    private WebDriver driver;
    private BufferedWriter logWriter;
    private String logFilePath = "test_log_GuiTinNhan.txt"; // Đường dẫn tới file log

    @BeforeClass
    public void setup() throws IOException {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        logWriter = new BufferedWriter(new FileWriter(logFilePath));

        // Mở trang đăng nhập và ghi log
        log("Navigating to sign-in page...");
        driver.get("http://localhost:3000/sign-in");
        log("Navigated to login page.");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Điền email
        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("identifier-field")));
        emailField.sendKeys("thuhue12tn1@gmail.com");
        log("Entered email: thuhue12tn1@gmail.com");

        // Nhấn nút tiếp tục
        WebElement nextButton = driver.findElement(By.xpath("//form/button[2]"));
        nextButton.click();
        log("Clicked 'Next' button.");

        // Điền mật khẩu
        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//form/div/div/div[1]/div[2]/input")));
        passwordField.sendKeys("Thuhue2210");
        log("Entered password.");

        WebElement Next = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div[1]/div/div/div[1]/div[2]/form/button[2]")));
        Next.click();
        
        WebElement buttonMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div[2]/div[1]/div[3]/div[1]/div[2]/div/div/p[1]")));
        buttonMessage.click();
        log("Clicked 'Next' button after entering password.");
    }

    @Test(priority = 1)
    public void testInterface() throws InterruptedException, IOException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Kiểm tra URL sau đăng nhập
        log("\nChecking URL after login...");
        boolean urlChanged = wait.until(ExpectedConditions.urlToBe("http://localhost:3000/"));
        String actualUrl = driver.getCurrentUrl();
        System.out.println("Current URL: " + actualUrl);
        log("Current URL: " + actualUrl);

        // Kiểm tra URL với Assert
        Assert.assertEquals(actualUrl, "http://localhost:3000/", "URL không khớp sau khi đăng nhập!");
        log("URL verified successfully.");
    }

 // DataProvider cung cấp dữ liệu cho test case
    @DataProvider(name = "messageData")
    public Object[][] messageData() {
        return new Object[][] {
            { "Hello!", LocalTime.now() },       // Tin nhắn rỗng
            { "", LocalTime.now() }   // Tin nhắn "Hello!"
        };
    }

    @Test(priority = 2, dataProvider = "messageData")
    public void testMessageDisplay(String message, LocalTime expectedTime) throws InterruptedException, IOException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        log("\nOpening chat conversation...");
      
        // Nhấn vào phần tử chat hoặc nút để mở cuộc trò chuyện
        WebElement buttonMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div[2]/div/div/div[1]/div[3]/div[1]")));
        buttonMessage.click();
        log("Clicked on chat element.");

        // Tìm trường nhập tin nhắn và nhập tin nhắn
        WebElement messageField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div[2]/div/div/div[2]/div[3]/form/div/div/input")));
        messageField.clear();
        messageField.sendKeys(message);  // Sử dụng dữ liệu truyền vào
        log("Entered message: " + message);

        // Kiểm tra nếu tin nhắn rỗng, không nhấn gửi
        if (message.isEmpty()) {
            log("Message is empty, skipping send.");
        } else {
            driver.findElement(By.xpath("/html/body/div[2]/div/div/div[2]/div[3]/form/div/button")).click();
            log("Clicked 'Send' button.");
        }

        // Chờ một chút để tin nhắn được gửi (nếu có)
        Thread.sleep(3000);

        if (!message.isEmpty()) {
            // Tìm thời gian và tin nhắn đã gửi nếu có
            WebElement timeElement = driver.findElement(By.cssSelector(".text-xs.text-gray-400"));
            WebElement messageElement = driver.findElement(By.cssSelector(".text-sm.w-fit.overflow-hidden.bg-sky-500.text-white.rounded-full.py-2.px-3 > div"));

            String timeText = timeElement.getText();  // Ví dụ: "7:20 PM"
            String messageText = messageElement.getText();  // Nội dung tin nhắn, ví dụ: "Hello!"
            log("Retrieved message text: " + messageText);

            // Định dạng thời gian
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mm a");
            LocalTime messageTime = LocalTime.parse(timeText, formatter);  // Chuyển chuỗi thành LocalTime

            // Kiểm tra nội dung tin nhắn và thời gian
            boolean isMessageCorrect = messageText.equals(message);
            boolean isTimeCorrect = messageTime.isBefore(expectedTime);

            // Assert cả 2 điều kiện
            Assert.assertTrue(isMessageCorrect && isTimeCorrect, 
                    "Kiểm tra không thành công! \n" +
                    "Nội dung tin nhắn không khớp: " + messageText + "\n" +
                    "Thời gian tin nhắn không nhỏ hơn thời gian hiện tại: " + messageTime);
            log("Message and time checked successfully.");
        } else {
            log("No message sent due to empty input.");
        }
    }
    
    @Test(priority = 3)
    public void sentMessageWithDisconnectInternet() throws InterruptedException, IOException {
        log("\nsent Message With Disconnect Internet");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // 1. Click vào menu 'Messages'
        WebElement messagesMenu = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div[2]/div/div/div[1]/div[3]/div[1]")));
        messagesMenu.click();
        log("Clicked on 'Messages' menu.");

        // 2. Tìm trường nhập tin nhắn và nhập nội dung 'Hello!'
        WebElement messageField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"message\"]")));
        messageField.sendKeys("Hello!");
        log("Entered message: Hello!");

        // 3. Click vào nút 'Send'
        WebElement sendButton = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[2]/div[3]/form/div/button"));
        sendButton.click();
        log("Clicked 'Send' button.");

        // 4. Ngắt kết nối Internet
        disconnectInternet();
        log("Disconnected from the internet.");

        // Chờ một chút để kiểm tra trạng thái gửi tin nhắn
        Thread.sleep(3000);
        reconnectInternet();
        // Kiểm tra thông báo lỗi kết nối (ví dụ: "No internet connection")
        WebElement errorMessageElement = driver.findElement(By.xpath("//div[contains(text(),'No internet connection')]"));
        
        // Kiểm tra xem thông báo lỗi có hiển thị không
        boolean isErrorDisplayed = errorMessageElement.isDisplayed();
        Assert.assertTrue(isErrorDisplayed, "Connection error message is not displayed!");

        // Kiểm tra nếu tin nhắn không được gửi (chúng ta có thể kiểm tra sự xuất hiện của tin nhắn trong UI)
        WebElement sentMessage = driver.findElement(By.cssSelector(".text-sm.w-fit.overflow-hidden.bg-sky-500.text-white.rounded-full.py-2.px-3 > div"));
        boolean isMessageSent = sentMessage.isDisplayed();

        // Kiểm tra xem tin nhắn có hiển thị không
        Assert.assertFalse(isMessageSent, "Message was sent even after disconnecting the internet!");

        log("Message sending failed as expected when the internet was disconnected.");
    }

    // Hàm ngắt kết nối Internet (sử dụng thao tác hệ thống)
    private void disconnectInternet() throws IOException {
        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            // Windows: Ngắt kết nối mạng bằng lệnh cmd
            Runtime.getRuntime().exec("cmd /c \"ipconfig /release\"");
            log("Internet connection released.");
        } else if (System.getProperty("os.name").toLowerCase().contains("nix") || 
                   System.getProperty("os.name").toLowerCase().contains("nux") || 
                   System.getProperty("os.name").toLowerCase().contains("mac")) {
            // Unix/Mac: Ngắt kết nối bằng lệnh ifconfig
            Runtime.getRuntime().exec("ifconfig eth0 down");
            log("Internet connection released.");
        }
    }
    private void reconnectInternet() throws IOException {
        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            // Windows: Kết nối lại Internet bằng lệnh cmd
            Runtime.getRuntime().exec("cmd /c \"ipconfig /renew\"");
            log("Internet connection restored.");
        } else if (System.getProperty("os.name").toLowerCase().contains("nix") || 
                   System.getProperty("os.name").toLowerCase().contains("nux") || 
                   System.getProperty("os.name").toLowerCase().contains("mac")) {
            // Unix/Mac: Kết nối lại bằng lệnh ifconfig
            Runtime.getRuntime().exec("ifconfig eth0 up");
            log("Internet connection restored.");
        }
    }



    @AfterClass
    public void tearDown() throws IOException {
        if (driver != null) {
            driver.quit();
            log("\nBrowser closed.");
        }
        if (logWriter != null) {
            logWriter.close();
            log("\nLog file closed.");
        }
    }

    private void log(String message) throws IOException {
        logWriter.write(message);
        logWriter.newLine();
        logWriter.flush();
        System.out.println(message);
    }
}
