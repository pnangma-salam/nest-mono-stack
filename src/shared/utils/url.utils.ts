export class UrlUtils {
  static parseQueryString(queryString: string): Record<string, string> {
    const params = new URLSearchParams(queryString.replace(/^\?/, ''));
    const result: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
      result[key] = value;
    }

    return result;
  }

  static buildQueryString(params: Record<string, any>): string {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.set(key, String(value));
      }
    });

    const queryString = urlParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  static mergeQueryParams(
    currentParams: Record<string, any>,
    newParams: Record<string, any>,
  ): Record<string, any> {
    return {
      ...currentParams,
      ...newParams,
    };
  }
}
