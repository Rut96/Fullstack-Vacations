class AppConfig {

    private readonly baseUrl = process.env.REACT_APP_BASE_URL;

	public readonly registerUrl = this.baseUrl + "api/register/";
	public readonly loginUrl = this.baseUrl + "api/login/";
	public readonly vacationsUrl = this.baseUrl + "api/vacations/";
	public readonly vacationsWithLikesUrl = this.baseUrl + "api/vacations-likes/";
	public readonly likesUrl = this.baseUrl + "api/likes/";
	
	public readonly vacationImgUrl = this.baseUrl + "api/vacations/images/";
}

export const appConfig = new AppConfig();
