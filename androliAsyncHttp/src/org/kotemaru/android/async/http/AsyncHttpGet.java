package org.kotemaru.android.async.http;

import java.net.URI;
import java.net.URISyntaxException;

import org.apache.http.HttpEntity;
import org.apache.http.RequestLine;
import org.apache.http.message.BasicRequestLine;

/**
 * GETリクエスト。
 * - 再利用可能。
 * @author kotemaru.org
 */
public class AsyncHttpGet extends AsyncHttpRequest {

	public AsyncHttpGet() {
	}
	public AsyncHttpGet(URI uri) {
		super(uri);
	}
	public AsyncHttpGet(String uri) throws URISyntaxException {
		super(new URI(uri));
	}

	@Override
	public MethodType getMethodType() {
		return MethodType.GET;
	}
	@Override
	public RequestLine getRequestLine() {
		return new BasicRequestLine(MethodType.GET.name(), getURI().toASCIIString(), HttpUtil.PROTOCOL_VERSION);
	}
	@Override
	public HttpEntity getHttpEntity() {
		return null;
	}
}
