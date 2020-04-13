export class ConfigSetting {
	public static BASE_API_URL = 'http://localhost:5000/api/';
	public static PeriodTimeTokenValid = 24 //hour; 

	//   authenticate
	public static UrlPathLogin = 'auth/login';
	public static UrlPathRegister = 'auth/register';

	// CRUD bank account 
	public static UrlPathBankAccount = 'bank_account';

	// navigation path
	public static NavigationPathHomePage = '/home';
	public static NavigationPathLoginPage = '/login';

	//constant variable
	public static BankAccountGenderList = [ 'M', 'F'];

	//regex
	public static RegexEmailValidator = "^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

	//error message
	public static MessageErrorPermissionDeny = "You do not have permission to access and perform this function";

	public static getCompleteURL(absolutePath: string): string{
		return `${ConfigSetting.BASE_API_URL}${absolutePath}`;
	}
}