package org.kotemaru.aptutil.test.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;

@Retention(RetentionPolicy.CLASS)
@Target(ElementType.TYPE)
public @interface AutoBean {
	boolean setter() default true;
	boolean getter() default true;
	String bean(); // class
}
